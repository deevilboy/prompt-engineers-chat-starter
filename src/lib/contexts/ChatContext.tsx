import { useRouter } from 'next/router';
import { useContext, createContext, useState, useEffect } from 'react';

import {
  API_KEY,
  AWS_BUCKET_NAME,
  DEFAULT_CHAT_MODEL,
  HAS_PROXY,
  HOST,
  VECTORSTORE_FILE_PATH,
} from '../config';
import { Defaults } from '../config/prompt';
import type { IContextProvider } from '../interfaces/Provider';
import type { Message } from '../types/chat';
import { removeElementsFromIndex } from '../utils/format';

export const ChatContext = createContext({});

export default function ChatProvider({ children }: IContextProvider) {
  const router = useRouter();
  const [websckt, setWebsckt] = useState<WebSocket>();
  const [connected, setConnected] = useState(true);
  // Settings
  const [isChecked, setIsChecked] = useState(false);
  const [sourcesEnabled, setSourcesEnabled] = useState(false);
  const [chatModel, setChatModel] = useState(DEFAULT_CHAT_MODEL);
  const [header, setHeader] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [temperature, setTemperature] = useState<number>(90);
  const [systemMessage, setSystemMessage] = useState(
    Defaults.SYSTEM_MESSAGE_CONTEXTGPT
  );
  const [params, setParams] = useState({
    bucketName: AWS_BUCKET_NAME || 'prompt-engineers-dev',
    filePath: VECTORSTORE_FILE_PATH || 'formio.pkl',
    session: Date.now(),
  });
  const [wsUrl, setWsUrl] = useState(``);

  const addMessage = (content: any, className: string) => {
    setMessages((prevMessages) => [...prevMessages, { content, className }]);
  };

  const updateLastMessage = (message: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessageIndex = updatedMessages.length - 1;
      const lastMessageContent = updatedMessages[lastMessageIndex].content;

      if (!lastMessageContent.endsWith(message)) {
        updatedMessages[lastMessageIndex].content +=
          message === '\n' ? '\n' : message;
      }

      return updatedMessages;
    });
  };

  const extractSources = (text: string): string[] | null => {
    const lowerCaseText = text.toLowerCase();
    const sourcesKeyword = 'sources:';
    const sourcesIndex = lowerCaseText.indexOf(sourcesKeyword);

    if (sourcesIndex === -1) {
      return null;
    }

    const sourcesText = text.substring(sourcesIndex + sourcesKeyword.length);
    return sourcesText.split(/,|\n-/).map((source) => source.trim());
  };

  const wrapSourcesInAnchorTags = (sources: string[]): string[] => {
    return sources.map(
      (source) =>
        `<a href="${source.replace(
          'rtdocs',
          'https:/'
        )}" target="_blank" class="source-link"><div class="well">${source.replace(
          'rtdocs',
          'https:/'
        )}</div></a>`
    );
  };

  const removeSources = (text: string): string => {
    return text.replace(/(sources:)[\s\S]*/i, '').trim();
  };

  const resetSession = () => {
    if (HAS_PROXY) {
      console.log('resetting session');
      setMessages([]);
      websckt?.close();
      const timeNow = Date.now();
      setParams({
        ...params,
        session: timeNow
      })
      router.replace({
          pathname: router.pathname,
          query: { ...router.query, channel: timeNow },
      }, undefined, { shallow: true });
      // This will not connect but is here to reset the connection by changing the wsUrl
      setWsUrl(``);
      // This will reconnect to create a new session
      setTimeout(() => {
        setWsUrl(`${HOST}/ws/proxy?session=${params.session}`);
      }, 500);
    } else {
      console.log('resetting session');
      setMessages([]);
      websckt?.close();
      // This will not connect but is here to reset the connection by changing the wsUrl
      setWsUrl(`${HOST}/ws/v1/chat/vectorstore`);
      // This will reconnect to create a new session
      setTimeout(() => {
        setWsUrl(
          `${HOST}/ws/v1/chat/vectorstore?api_key=${API_KEY}&bucket=${params.bucketName}&path=${params.filePath}&session=${params.session}`
        );
      }, 500);
    }
  };

  const disconnect = () => {
    setConnected(false);
    websckt?.close();
  };

  /**
   * Loads the messages into the UI
   * @param event
   */
  const loadMessages = (event: any) => {
    const data = JSON.parse(event.data);
    // console.log(data.message);
    if (data.sender === 'bot') {
      if (data.type === 'start') {
        setHeader('Computing answer...');
        addMessage('', 'server-message');
      } else if (data.type === 'stream') {
        setHeader('Chatbot is typing...');
        updateLastMessage(data.message);
      } else if (data.type === 'info') {
        setHeader(data.message);
      } else if (data.type === 'end') {
        setHeader('Ask a question');
      } else if (data.type === 'error') {
        setHeader('Ask a question');
        updateLastMessage(data.message);
      }
    } else {
      addMessage(`${data.message}`, 'client-message');
    }
  };

  useEffect(() => {
    const prevModelExists = sessionStorage.getItem('model');
    if (prevModelExists) {
      setChatModel(prevModelExists);
    }
  }, [chatModel]);

  useEffect(() => {
    const prevMessageExists = sessionStorage.getItem('systemMessage');
    if (prevMessageExists) {
      setSystemMessage(prevMessageExists);
    }
  }, [systemMessage]);

  useEffect(() => {
    if (messages.length >= 1) {
      // Get the last message
      const lastElement = messages[messages.length - 1];
      let sources = extractSources(lastElement.content);
      if (sources) {
        // Return all the source links and remove empties
        sources = sources.filter(function (e) {
          return e;
        });
        // Remove the sources text from the last message content
        const remove = removeSources(lastElement.content);
        const arr = removeElementsFromIndex(messages, messages.length - 1);
        arr.push({ className: lastElement.className, content: '' });
        setMessages(arr);
        // Wrap with anchor tags
        const wrappedSources = wrapSourcesInAnchorTags(sources);
        // Update the last message with the formmated tags.
        const reformatted = `${remove}\n\n${wrappedSources.join('\n')}`;
        updateLastMessage(reformatted);
      }
    }
  }, [header]);

  return (
    <ChatContext.Provider
      value={{
        temperature,
        setTemperature,
        systemMessage,
        setSystemMessage,
        params,
        setParams,
        header,
        setHeader,
        messages,
        setMessages,
        loadMessages,
        connected,
        setConnected,
        wsUrl,
        setWsUrl,
        disconnect,
        websckt,
        setWebsckt,
        chatModel,
        setChatModel,
        sourcesEnabled,
        setSourcesEnabled,
        resetSession,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): any {
  return useContext(ChatContext);
}

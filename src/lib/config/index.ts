export const HOST =
  process.env.NEXT_PUBLIC_HOST || 'wss://api.promptengineers.ai';
export const API_KEY = process.env.NEXT_PUBLIC_PE_API_KEY;
export const HAS_PROXY = process.env.NEXT_PUBLIC_HAS_PROXY === 'true';

export const AWS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'prompt-engineers-dev';
export const VECTORSTORE_FILE_PATH =
  process.env.NEXT_PUBLIC_VECTORSTORE_FILE_PATH || 'formio.pkl';

export enum ChatModels {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
}

export const DEFAULT_CHAT_MODEL =
  process.env.NEXT_PUBLIC_DEFAULT_CHAT_MODEL || ChatModels.GPT_3_5;

export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE || 'Langchain GPT';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '';
export const CONTEXT_LINK =
  process.env.NEXT_PUBLIC_CONTEXT_LINK ||
  'https://python.langchain.com/en/latest';

export const API_URL =
  process.env.NEXT_PUBLIC_API_HOST || 'https://api.promptengineers.ai';
export const WS_URL =
  process.env.NEXT_PUBLIC_WS_HOST || 'wss://api.promptengineers.ai';
export const API_KEY = process.env.NEXT_PUBLIC_PE_API_KEY || '';
export const HAS_PROXY = process.env.NEXT_PUBLIC_HAS_PROXY === 'true';

export const AWS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'prompt-engineers-dev';
export const VECTORSTORE_FILE_PATH =
  process.env.NEXT_PUBLIC_VECTORSTORE_FILE_PATH || 'formio.pkl';

export enum ChatModels {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_16K = 'gpt-3.5-turbo-16k',
  GPT_4 = 'gpt-4',
}

export const DEFAULT_CHAT_MODEL =
  process.env.NEXT_PUBLIC_DEFAULT_CHAT_MODEL || ChatModels.GPT_3_5_16K;

export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE || 'Langchain GPT';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '';
export const CONTEXT_LINK =
  process.env.NEXT_PUBLIC_CONTEXT_LINK ||
  'https://python.langchain.com/en/latest';

export const SIDEBAR_COLOR = '#000';
export const MAIN_BG = '#333';
export const SECONDARY = '#90CDF4';
export const CLIENT_MSG_BG = '#272822';

export const LOGO_LINK =
  'https://www.gitbook.com/cdn-cgi/image/width=256,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1673552148-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MPHoF2HwOA0s5HV_AIB%252Flogo%252Fxq23PL4Mr0r4RQS0tVU9%252Flight.png%3Falt%3Dmedia%26token%3Dc729c593-1169-4515-9562-ffd4a5424131';

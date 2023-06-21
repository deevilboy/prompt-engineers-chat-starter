import { APP_TITLE, APP_VERSION, LOGO_LINK } from './src/lib/config/index';

const version = APP_VERSION ? `- ${APP_VERSION}` : null

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: APP_TITLE,
  titleTemplate: `%s | ${APP_TITLE}`,
  defaultTitle: APP_TITLE.toLowerCase().replace(/ /g, '-'),
  description: "Prompt Engineers Chat Assistant",
  canonical: "https://preview.promptengineers.ai",
  openGraph: {
    url: "https://preview.promptengineers.ai",
    title: APP_TITLE.toLowerCase().replace(/ /g, '-'),
    description: "Prompt Engineers Chat Assistant",
    images: [
      {
        url: LOGO_LINK,
        alt: "Prompt Engineers GPT",
      },
    ],
    site_name: "prompt-engineers-gpt",
  },
  twitter: {
    handle: "@JohnEggz",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;

# 🔋 ⚡ Prompt Engineers - Chat Starter Interface

<div align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsozonome%2Fnextarter-chakra" target="_blank"><img src="https://vercel.com/button" alt="Deploy with Vercel" /></a> <a href="https://app.netlify.com/start/deploy?repository=https://github.com/kre8mymedia/Prompt-Engineers-Chat-Starter" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" /></a> <a href="https://railway.app/new/template/aqmmai?referralCode=9lKVVo" target="_blank"><img src="https://railway.app/button.svg" alt="Deploy on Railway" height="32px" /></a>

<a href="https://stackblitz.com/github/sozonome/nextarter-chakra" target="_blank"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" /></a>

  <p>This is a <a href="https://nextjs.org/" target="_blank">Next.js</a> project bootstrapped with <code>create-next-app</code>, added with <a href="https://chakra-ui.com" target="_blank"><b>Chakra UI</b></a> and <a href="https://www.typescriptlang.org" target="_blank"><b>TypeScript</b></a> setup. <br/> Start developing right away!</p>

## Add api key to **NEXT_PUBLIC_PE_API_KEY** in .env

</div>

- ✔️ toolings for linting, formatting, and conventions configured

- 📱 PWA-ready

  `next-pwa` configured, disabled by default, just enable it through `next.config.js`

- 🔎 SEO optimization configured

  with `next-seo` and `next-sitemap`. you'll need to reconfigure or tinker with it to get it right according to your needs, but it's there if you need it.

- 🎨 basic responsive layout configured

  don't need it? just remove it 😃


## Pre-requisites

1. [Node.js](https://nodejs.org/en/) or nvm installed.
2. `yarn` installed.

## Getting Started


1. After cloning the project, run this command: `yarn` or `yarn install`

2. Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/lib/pages/home/index.tsx`. The page auto-updates as you edit the file.

## How to Run e2e Test (in local machine)

1. Build production with `yarn build`, then run the production build using `yarn start`.
2. Open another terminal (or new terminal tab, don't cancel / close the production server), then run the test with `yarn test:e2e`.

References:

- https://nextjs.org/docs/testing#playwright
  - https://nextjs.org/docs/testing#running-your-playwright-tests

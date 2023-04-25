# NFT Indexer

This DApp uses the Alchemy SDK rigged to Alchemy's Enhanced APIs to display all the ERC-721 tokens owned by an address or ENS.

The result of the is displayed in the UI showing the NFT images and their metadata.

Cloned from [Alchemy](https://github.com/alchemyplatform/nft-indexer), added features by Eduardo Aire.

## Structure

1. [main.jsx](./src/main.jsx) - entry point
2. [index.css](./src/App.jsx) - styles
3. [App.jsx](./src/App.jsx) - DApp main component
4. [components](./src/components/) - DApp main component

## Set Up

1. Install dependencies by running `npm install`
2. Start the application by running `npm run dev`

## Features

1. Wagmi wallet connection integration on [ConnectWallet.js](./src/components/ConnectWallet.jsx)
2. Use of [Chakra]() spinners and `isLoading` states to improve UX's waiting time when a request is fired
3. Friendly UI design using fonts and colors that create a harmonic contrast and help the user to know what's happening when there's any kind of interaction with the app
4. The NFT images can sometimes appear and sometimes not... can you think of ways to fix that?
5. Errors and exceptions are handled using error messages displayed on the UI and popping alert windows

## Live demo

### [eat-nft-indexer.vercel.app/](https://eat-nft-indexer.vercel.app/)

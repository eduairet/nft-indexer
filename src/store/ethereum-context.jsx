import React, { useState } from 'react';

import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { VITE_API_KEY, VITE_WALLET_CONNECT } = import.meta.env,
    { chains, provider, webSocketProvider } = configureChains(
        [mainnet],
        [alchemyProvider({ apiKey: VITE_API_KEY }), publicProvider()]
    ),
    client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
            new CoinbaseWalletConnector({
                chains,
                options: {
                    appName: 'NFT Indexer',
                },
            }),
            new WalletConnectConnector({
                chains,
                options: {
                    projectId: VITE_WALLET_CONNECT,
                },
            }),
            new InjectedConnector({
                chains,
                options: {
                    name: 'Injected',
                    shimDisconnect: true,
                },
            }),
        ],
        provider,
        webSocketProvider,
    });

export const EthereumContext = React.createContext({
    userAddress: '',
    setUserAddress: () => {},
    results: [],
    setResults: () => {},
    hasQueried: false,
    setHasQueried: () => {},
    tokenDataObjects: [],
    setTokenDataObjects: () => {},
});

const EthereumContextProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState(''),
        [results, setResults] = useState([]),
        [hasQueried, setHasQueried] = useState(false),
        [tokenDataObjects, setTokenDataObjects] = useState([]);

    return (
        <WagmiConfig client={client}>
            <EthereumContext.Provider
                value={{
                    userAddress,
                    setUserAddress,
                    results,
                    setResults,
                    hasQueried,
                    setHasQueried,
                    tokenDataObjects,
                    setTokenDataObjects,
                }}
            >
                {children}
            </EthereumContext.Provider>
        </WagmiConfig>
    );
};

export default EthereumContextProvider;

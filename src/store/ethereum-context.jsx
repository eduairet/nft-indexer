import React, { useState } from 'react';

import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { VITE_API_KEY } = import.meta.env,
    { chains, provider, webSocketProvider } = configureChains(
        [mainnet],
        [alchemyProvider({ apiKey: VITE_API_KEY }), publicProvider()]
    ),
    client = createClient({
        autoConnect: true,
        connectors: [
            new InjectedConnector({
                chains,
                options: {
                    name: 'Connect',
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
    isQuerying: false,
    setIsQuerying: () => {},
});

const EthereumContextProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState(''),
        [results, setResults] = useState([]),
        [hasQueried, setHasQueried] = useState(false),
        [tokenDataObjects, setTokenDataObjects] = useState([]),
        [isQuerying, setIsQuerying] = useState(false);

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
                    isQuerying,
                    setIsQuerying,
                }}
            >
                {children}
            </EthereumContext.Provider>
        </WagmiConfig>
    );
};

export default EthereumContextProvider;

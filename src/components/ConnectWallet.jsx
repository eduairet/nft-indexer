import { useEffect, useContext } from 'react';
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { EthereumContext } from '../store/ethereum-context';

export default function ConnectWallet() {
    const { setUserAddress } = useContext(EthereumContext),
        { connect, connectors, error, isLoading, pendingConnector } =
            useConnect(),
        [injected] = connectors,
        { disconnect } = useDisconnect(),
        { address, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected) setUserAddress(address);
    }, [isConnected]);

    return (
        <>
            {injected.ready ? (
                <SimpleGrid
                    columns={1}
                    spacing={5}
                    w='100%'
                    maxW={300}
                    paddingY='1rem'
                >
                    {isConnected ? (
                        <>
                            <Text
                                fontSize='1rem'
                                textAlign='center'
                                color='cyan'
                                fontWeight={700}
                                border='2px solid yellow'
                                padding='1rem'
                                borderRadius='1rem'
                            >{`${address.slice(0, 10)}...${address.slice(
                                -10
                            )}`}</Text>
                            <Button
                                fontWeight={700}
                                onClick={() => {
                                    setUserAddress('');
                                    disconnect();
                                }}
                            >
                                Disconnect
                            </Button>
                        </>
                    ) : (
                        <Button
                            isDisabled={!injected.ready}
                            onClick={() => connect({ connector: injected })}
                            bgColor='magenta'
                            fontWeight={700}
                        >
                            {isLoading && injected.id === pendingConnector?.id
                                ? 'Loading...'
                                : injected.name}
                        </Button>
                    )}
                </SimpleGrid>
            ) : null}
            {error && <div>{error.message}</div>}
        </>
    );
}

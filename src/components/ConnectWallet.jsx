import { Button, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useConnect } from 'wagmi';

export default function ConnectWallet() {
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();
    return (
        <>
            <SimpleGrid
                columns={2}
                spacing={10}
                w='100%'
                maxW={800}
                paddingY='1.5rem'
            >
                {connectors.map(connector => (
                    <Button
                        key={connector.id}
                        isDisabled={!connector.ready}
                        onClick={() => connect({ connector })}
                        bgColor='magenta'
                        fontWeight={700}
                    >
                        {isLoading && connector.id === pendingConnector?.id
                            ? 'Loading...'
                            : connector.name}
                        {!connector.ready && ' (unsupported)'}
                    </Button>
                ))}
            </SimpleGrid>
            {error && <div>{error.message}</div>}
        </>
    );
}

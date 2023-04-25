import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import ConnectWallet from './ConnectWallet';

export default function IndexerHeader() {
    return (
        <Center>
            <Flex
                alignItems={'center'}
                justifyContent='center'
                flexDirection={'column'}
            >
                <Heading mb={0} fontSize='4rem'>
                    NFT Indexer
                </Heading>
                <Text fontSize='1.25rem'>
                    Plug in an address and this website will return all of its
                    NFTs!
                </Text>
                <ConnectWallet />
            </Flex>
        </Center>
    );
}

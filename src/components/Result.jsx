import {
    Heading,
    SimpleGrid,
    Flex,
    Box,
    Image,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { EthereumContext } from '../store/ethereum-context';

export default function Result() {
    const { hasQueried, results, tokenDataObjects, isQuerying } =
        useContext(EthereumContext);

    return isQuerying ? (
        <Center height='5rem' width='5rem' marginTop='2rem'>
            <Spinner
                height='5rem'
                width='5rem'
                color='yellow'
                thickness='4px'
                speed='0.65s'
                size='xl'
            />
        </Center>
    ) : (
        <>
            <Heading my={36}>Here are your NFTs:</Heading>
            {hasQueried ? (
                <SimpleGrid w={'90vw'} columns={4} spacing={24}>
                    {results.ownedNfts.map((e, i) => {
                        return (
                            <Flex
                                key={`nft-${e.id}-${i}`}
                                flexDir={'column'}
                                color='white'
                                bg='blue'
                                w={'20vw'}
                            >
                                <Box>
                                    <b>Name:</b>{' '}
                                    {tokenDataObjects[i].title?.length === 0
                                        ? 'No Name'
                                        : tokenDataObjects[i].title}
                                </Box>
                                <Image
                                    src={
                                        tokenDataObjects[i]?.rawMetadata
                                            ?.image ??
                                        'https://via.placeholder.com/200'
                                    }
                                    alt={'Image'}
                                />
                            </Flex>
                        );
                    })}
                </SimpleGrid>
            ) : (
                'Please make a query! The query may take a few seconds...'
            )}
        </>
    );
}

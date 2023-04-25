import { Heading, SimpleGrid, Flex, Box, Image } from '@chakra-ui/react';
import { useContext } from 'react';
import { EthereumContext } from '../store/ethereum-context';

export default function Result() {
    const { hasQueried, results, tokenDataObjects } =
        useContext(EthereumContext);

    return (
        <>
            <Heading my={36}>Here are your NFTs:</Heading>
            {hasQueried ? (
                <SimpleGrid w={'90vw'} columns={4} spacing={24}>
                    {results.ownedNfts.map((e, i) => {
                        return (
                            <Flex
                                flexDir={'column'}
                                color='white'
                                bg='blue'
                                w={'20vw'}
                                key={e.id}
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

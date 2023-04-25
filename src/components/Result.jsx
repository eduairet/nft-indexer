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
    ) : hasQueried && results.ownedNfts.length && !isQuerying ? (
        <>
            <Heading my={36}>Here are your NFTs:</Heading>
            <SimpleGrid w={'90vw'} maxWidth={800} columns={3} spacing='3rem'>
                {results.ownedNfts.map((e, i) => {
                    const nft = tokenDataObjects[i];
                    if (!nft.metadataError) {
                        let gateway;
                        try {
                            gateway = nft.media[0].gateway;
                        } catch (err) {
                            gateway = 'https://via.placeholder.com/200';
                        }
                        return (
                            <Flex
                                key={`nft-${e.id}-${i}`}
                                flexDir={'column'}
                                color='white'
                                gap='1rem'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Box fontWeight={700}>
                                    {nft.title?.length === 0
                                        ? 'No Name'
                                        : nft.title}
                                </Box>
                                <Flex
                                    border='3px solid cyan'
                                    borderRadius='0.5rem'
                                    width='15rem'
                                    height='15rem'
                                    overflow='hidden'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Image
                                        width='100%'
                                        height='100%'
                                        objectFit='cover'
                                        src={gateway}
                                        alt={'NFT Image'}
                                    />
                                </Flex>
                            </Flex>
                        );
                    } else {
                        return null;
                    }
                })}
            </SimpleGrid>
        </>
    ) : (
        <>
            <Heading my={36}>Your NFTs will appear below</Heading>
            <Center>
                {hasQueried
                    ? 'No results'
                    : 'Please make a query! The query may take a few seconds...'}
            </Center>
        </>
    );
}

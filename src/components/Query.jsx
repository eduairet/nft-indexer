import { useContext } from 'react';
import { Button, Heading, Input } from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { EthereumContext } from '../store/ethereum-context';
const { VITE_API_KEY } = import.meta.env;

export default function Query() {
    const {
        userAddress,
        setResults,
        setTokenDataObjects,
        setHasQueried,
        setUserAddress,
    } = useContext(EthereumContext);

    async function getNFTsForOwner() {
        const config = {
                apiKey: VITE_API_KEY,
                network: Network.ETH_MAINNET,
            },
            alchemy = new Alchemy(config),
            data = await alchemy.nft.getNftsForOwner(userAddress);

        setResults(data);
        const tokenDataPromises = [];
        for (let i = 0; i < data.ownedNfts.length; i++) {
            const tokenData = alchemy.nft.getNftMetadata(
                data.ownedNfts[i].contract.address,
                data.ownedNfts[i].tokenId
            );
            tokenDataPromises.push(tokenData);
        }

        setTokenDataObjects(await Promise.all(tokenDataPromises));
        setHasQueried(true);
    }

    return (
        <>
            <Heading mt={42}>
                Get all the ERC-721 tokens of this address:
            </Heading>
            <Input
                onChange={e => setUserAddress(e.target.value)}
                color='black'
                w='600px'
                textAlign='center'
                p={4}
                bgColor='white'
                fontSize={24}
            />
            <Button
                fontSize={20}
                onClick={getNFTsForOwner}
                mt={36}
                bgColor='magenta'
            >
                Fetch NFTs
            </Button>
        </>
    );
}

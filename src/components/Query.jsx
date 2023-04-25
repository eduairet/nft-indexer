import { useContext } from 'react';
import { Button, Heading, Input } from '@chakra-ui/react';
import { Alchemy, Network, NftFilters } from 'alchemy-sdk';
import { EthereumContext } from '../store/ethereum-context';
import { utils } from 'ethers';
const { VITE_API_KEY } = import.meta.env,
    { isAddress } = utils;

export default function Query() {
    const {
            userAddress,
            setResults,
            setTokenDataObjects,
            setHasQueried,
            setUserAddress,
            isQuerying,
            setIsQuerying,
        } = useContext(EthereumContext),
        checkAddress = () => {
            const check =
                isAddress(userAddress) || /^[a-z]+\.eth$/.test(userAddress);
            return check;
        };

    async function getNFTsForOwner() {
        setIsQuerying(true);
        try {
            const config = {
                    apiKey: VITE_API_KEY,
                    network: Network.ETH_MAINNET,
                },
                alchemy = new Alchemy(config);
            let queryAddress = userAddress;
            if (/^[a-z]+\.eth/.test(queryAddress)) {
                queryAddress = await alchemy.core.resolveName(queryAddress);
            }
            const data = await alchemy.nft.getNftsForOwner(queryAddress, {
                excludeFilters: [NftFilters.SPAM],
            });
            setResults(data);
            const tokenDataPromises = [];
            for (let i = 0; i < data.ownedNfts.length; i++) {
                try {
                    const tokenData = alchemy.nft.getNftMetadata(
                        data.ownedNfts[i].contract.address,
                        data.ownedNfts[i].tokenId
                    );
                    tokenDataPromises.push(tokenData);
                } catch (err) {
                    tokenDataPromises.push(null);
                }
            }
            setTokenDataObjects(await Promise.all(tokenDataPromises));
            setHasQueried(true);
        } catch (err) {
            alert(err);
        }
        setIsQuerying(false);
    }

    return (
        <>
            <Heading mt={42}>
                Get all the ERC-721 tokens of this address or ENS:
            </Heading>
            <Input
                onChange={e => setUserAddress(e.target.value)}
                color='black'
                w='600px'
                textAlign='center'
                p='1rem'
                borderRadius='0.5rem'
                bgColor='beige'
                fontSize='1.1rem'
                value={userAddress}
                border={`2px solid ${
                    checkAddress() || userAddress === '' ? 'cyan' : 'red'
                }`}
            />
            <Button
                isLoading={isQuerying}
                onClick={getNFTsForOwner}
                mt={36}
                isDisabled={!checkAddress() || isQuerying}
            >
                Fetch NFTs
            </Button>
        </>
    );
}

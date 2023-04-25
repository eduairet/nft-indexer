import { Box, Flex } from '@chakra-ui/react';
import IndexerHeader from './components/IndexerHeader';
import Query from './components/Query';
import Result from './components/Result';

function App() {
    return (
        <Box w='100vw' paddingY='3rem'>
            <IndexerHeader />
            <Flex
                w='100%'
                flexDirection='column'
                alignItems='center'
                justifyContent={'center'}
            >
                <Query />
                <Result />
            </Flex>
        </Box>
    );
}

export default App;

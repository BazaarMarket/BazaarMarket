import React, { useEffect } from 'react';
import { Box, Container, Text, Flex, Heading, SimpleGrid, Spinner, Input, InputRightElement, InputGroup, Button } from '@chakra-ui/react';
import { Wind, Search, Filter, BarChart, ArrowRight, ArrowDown, Sliders } from 'react-feather';
import { useSelector, useDispatch } from '../../../reducer';
import { getMarketplaceNftsQuery, loadMoreMarketplaceNftsQuery } from '../../../reducer/async/queries';
import TokenCard from './TokenCard';
import FeaturedToken from './FeaturedToken';
import { VisibilityTrigger } from '../../common/VisibilityTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function Catalog() {
  const { system, marketplace: state } = useSelector(s => s);
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    dispatch(getMarketplaceNftsQuery(state.marketplace.address));
  }, [ state.marketplace.address, dispatch ]);

  const loadMore = () => {
    dispatch(loadMoreMarketplaceNftsQuery({}));
  };

  let tokens = state.marketplace.tokens?.filter(x=>x.token).map(x=>x.token!) ?? [];

  function ShowFilters() {
    
    if (show){
      return (
        <Flex alignSelf="center">
              <Button 
                leftIcon={
                <Box fontSize="12px" fontWeight="bold" width="30px">
                  <Text float="left">A</Text>
                  <Text float="right">Z</Text>
                  <Box>
                    <ArrowRight size="1em"/>
                  </Box>
                  
                </Box>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Name 
              </Button>
              <Button 
                leftIcon={<ArrowDown size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Price
              </Button>
              <Button 
                leftIcon={<Sliders size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Category 
              </Button>
        </Flex>
      );
    }
    return(
      <>
        <Flex mb="25px">
        </Flex>
      </>
    );
  }

  function SearchBar() {
    return(
      <>
      <Flex  alignSelf="center" mt="20px" mb="25px">
      <Box borderColor="lightGray" borderWidth="1px" borderRadius="50px" width="500px" p="5px" pl="10px" bg="white"> 
        <Box float="left" pt="3px">
          <Search color="lightGray"/>
        </Box>
        <Box float="left" pt="4px">
          <InputGroup>
            <Input variant="unstyled" placeholder="Search NFTs..." ml="10px" color="lightGray" width="440px"/>
            <InputRightElement width="4.5rem" float="right">
              <Button h="1.5rem" size="sm" onClick={handleClick} float="right" mb="20px" borderRadius="100px">
                {show ? "Clear" : 
                  <Flex pr="2px">
                    <Box p="2px">
                      <Filter size="1em"/>
                    </Box>
                    Filters
                  </Flex>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Flex>
    <ShowFilters />
    </>
    );
  }

  return (
    <Flex
      w="100%"
      minH="90vh"
      bg="brand.brightGray"
      px={10}
      pt={6}
      overflowY="scroll"
      justify="start"
      flexDir="column"
    >
      <Container maxW="80em">
        <Flex
          flex="1"
          w="100%"
          flexDir="column"
          mt="5vh"
        >
          {!state.marketplace.loaded ? (
            <Flex flexDir="column" align="center" flex="1" pt={20}>
              <Spinner size="xl" mb={6} color="gray.300" />
              <Heading size="lg" textAlign="center" color="gray.500">
                Loading...
              </Heading>
            </Flex>
          ) :
            tokens.length === 0 ? (
            <Flex w="100%" flex="1" flexDir="column" align="center">
              <Flex
                px={20}
                py={10}
                bg="gray.200"
                textAlign="center"
                align="center"
                borderRadius="5px"
                flexDir="column"
                fontSize="xl"
                color="gray.400"
                mt={28}
              >
                <Wind />
                <Text fontWeight="600" pt={5}>
                  No tokens to display in this marketplace
                </Text>
              </Flex>
            </Flex>
            ) : (
              <>
                <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} gap={8} pb={8}>
                  <>
                    {tokens.slice(0).map(token => {
                      return (
                        <TokenCard
                          key={`${token.address}-${token.id}`}
                          config={system.config}
                          {...token}
                        />
                      );
                    })}
                    <VisibilityTrigger key={state.marketplace.tokens?.length + ':' + tokens.length} onVisible={loadMore} allowedDistanceToViewport={600}/>
                  </>
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}

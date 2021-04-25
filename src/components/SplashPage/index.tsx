import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image, Link, MenuButton, Button, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { Wind, Search, Filter, BarChart, ArrowRight, ArrowDown, Sliders } from 'react-feather';
import { MinterButton } from '../common';
import logo from '../../components/common/assets/logo.svg';
import BackgroundImage1 from '../SplashPage/CloversLeft.png';
import BackgroundImage2 from '../SplashPage/CloversRight.png';
import { useSelector, useDispatch } from '../../reducer';
import { getMarketplaceNftsQuery, loadMoreMarketplaceNftsQuery } from '../../reducer/async/queries';
import TokenCard from '../Marketplace/Catalog/TokenCard';
import { VisibilityTrigger } from '../common/VisibilityTrigger';
import { connectWallet } from '../../reducer/async/wallet';

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const system = useSelector(s => s.system);
  const dispatch = useDispatch();

  function FeaturedTokens(){
    const { marketplace: state } = useSelector(s => s);
    
    useEffect(() => {
      dispatch(getMarketplaceNftsQuery(state.marketplace.address));
    }, [ state.marketplace.address, dispatch ]);
  
    const loadMore = () => {
      dispatch(loadMoreMarketplaceNftsQuery({}));
    };

    let tokens = state.marketplace.tokens?.filter(x=>x.token).map(x=>x.token!) ?? [];

    return(
      <Flex
      w="100%"
      h="100%"
      bg="brand.darkGray"
      px={10}
      pt={6}
      justify="start"
      flexDir="column"
    >
      <Container maxW="80em">
        <Flex
          flex="1"
          w="100%"
          flexDir="column"
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
                    {tokens.slice(0,4).map(token => {
                      return (
                        <TokenCard
                          key={`${token.address}-${token.id}`}
                          config={system.config}
                          {...token}
                        />
                      );
                    })}
                  </>
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
    </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
    >
      <Flex height="90vh" flexDir="column" align="center" maxW="600px">
        <Heading color="brand.darkGray" size="xl" pb={8} position="absolute" pt="30vh">
          Carbon-Offset NFTs on Tezos
        </Heading>
        <Heading
          color="brand.darkGray"
          size="md"
          textAlign="center"
          fontFamily="Helvetica"
          pb={12}
          opacity=".8"
          m="50px"
          mt="35vh"
        >
          Create and mint non-fungible tokens guilt-free.
        </Heading>
        <MinterButton 
          backgroundColor="brand.green"
          color="white" 
          fontSize="20px" 
          width="150px" 
          onClick={() => setLocation("/create")}
        >
          <Text m={2} fontSize="20px">Start Minting</Text>
        </MinterButton>  
        <Image
          src={BackgroundImage1}
          align="left"
          height="20vh"
          mr="78vw"
          mt="70vh"
          position="absolute" 
        />
        <Image
          src={BackgroundImage2}
          align="right"
          height="20vh"
          ml="80vw"
          mt="70vh"
          position="absolute"
        />
      </Flex>
    </Flex>
  );
}

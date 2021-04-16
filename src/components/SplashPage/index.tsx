import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image, Link, MenuButton, Button, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { Wind, Search, Filter, BarChart, ArrowRight, ArrowDown, Sliders } from 'react-feather';
import { MinterButton /* , MinterLink */ } from '../common';
import logo from '../../components/common/assets/logo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { getMarketplaceNftsQuery } from '../../reducer/async/queries';
import TokenCard from '../Marketplace/Catalog/TokenCard';
import { connectWallet } from '../../reducer/async/wallet';

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const system = useSelector(s => s.system);
  const dispatch = useDispatch();

  const { marketplace: state } = useSelector(s => s);

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    if (system.status === 'WalletConnected') {
      setLocation('/');
    }
  }, [system.status, setLocation]);

  let tokens = state.marketplace.tokens;
  if (tokens === null) {
    tokens = [];
  }

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
    >

      <Flex height="500px" mt="10%" flexDir="column" align="center" maxW="600px" pt={10}>
        <Heading color="brand.darkGray" size="xl" pb={8}>
          Carbon-Offset NFTs on Tezos
        </Heading>
        <Heading
          color="brand.darkGray"
          size="md"
          textAlign="center"
          fontFamily="Helvetica"
          pb={12}
          opacity=".8"
        >
          Create and mint non-fungible tokens guilt-free.
        </Heading>
        <MinterButton backgroundColor="brand.blue" color="white" onClick={() => setLocation("/about")}>
          <Text m={2}>Learn More</Text>
        </MinterButton>  
      </Flex>
      <Flex height="700px" bg="brand.darkGray" width="100%" flexDir="column" align="center" pt={30} pb={30}>
        <Heading color="white" align="center" mt="50px">
          Most Popular Tokens
        </Heading>
        <Container maxW="80em">
        <Flex
          flex="1"
          w="100%"
          flexDir="column"
        >
          {!state.marketplace.loaded ? (
            <Flex flexDir="column" align="center" flex="1" pt="200px">
              <Spinner size="xl" mb={6} color="gray.300" />
              <Heading size="lg" textAlign="center" color="gray.500" pb="150px">
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
                  {tokens.slice(1).map(token => {
                    return (
                      <TokenCard
                        key={`${token.address}-${token.id}`}
                        network={system.config.network}
                        {...token}
                      />
                    );
                  })}
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
        <MinterButton p="10px" mt="25px" onClick={() => setLocation("/marketplace")}>
          <Text m={2}>Browse Market</Text>
        </MinterButton>          
      </Flex>
      <Flex bgColor="white" height="500px">
                  <Heading color="brand.darkGray" padding="75px">
                    Maybe an FAQ Section Here....
                  </Heading>
      </Flex>
    </Flex>
  );
}

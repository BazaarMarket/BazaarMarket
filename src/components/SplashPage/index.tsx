import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image, Link, MenuButton, Button } from '@chakra-ui/react';
import { MinterButton /* , MinterLink */ } from '../common';
import logo from '../../components/common/assets/logo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet } from '../../reducer/async/wallet';

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const system = useSelector(s => s.system);
  const dispatch = useDispatch();

  useEffect(() => {
    if (system.status === 'WalletConnected') {
      setLocation('/collections');
    }
  }, [system.status, setLocation]);

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
      bg="#f5f5f5"
    >
      
      <Flex mt="10%" flexDir="column" align="center" maxW="600px" pt={20}>
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
        <Button href="/about">
            <Link to="/about">
              <Text m={2}>Learn More</Text>
            </Link>
          </Button>
        <Flex minW="400px" justify="center" pb={20}>
        </Flex>
      </Flex>
      <Flex
        width="100%"
        bg="white"
        color="brand.darkGray"
        fontFamily="Helvetica"
        paddingX={10}
        paddingY={4}
        justifyContent="space-between"
      >
        <Text fontSize="xs">
          Bazaar NFT Marketplace {process.env.REACT_APP_VERSION}
        </Text>
        <Flex>
          <Link
            fontSize="xs"
            textDecor="underline"
            href="https://github.com/FacioErgoSum/bazaar-nfts-minter"
          >
            GitHub
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

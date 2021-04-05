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
      setLocation('/');
    }
  }, [system.status, setLocation]);

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
      bgImage="src(https://bit.ly/sage-adebayo)">

      <Flex mt="10%" flexDir="column" align="center" maxW="600px" pt={10}>
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
              <Text m={2}>Learn More</Text>
          </Button>
        <Flex minW="400px" justify="center" pb={10}>
        </Flex>
      </Flex>
      <Flex bg="brand.darkGray" width="100%" flexDir="column" pt={30} pb={30}>
        <Heading color="white" align="center">
          Coming Soon!
        </Heading>
      </Flex>
    </Flex>
  );
}

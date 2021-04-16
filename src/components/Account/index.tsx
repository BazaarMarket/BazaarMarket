import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Box, Flex, Text, Heading, Image, Link } from '@chakra-ui/react';
import { MinterButton /* , MinterLink */ } from '../common';
import logo from '../../components/common/assets/logo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet } from '../../reducer/async/wallet';

export default function AccountPage() {

  function WalletInfo(props: { tzPublicKey: string }) {
    return (
      <>
        <Box borderRadius="100%" width="50px" height="50px" bg="white" borderWidth="1px" borderColor="lightGray">
          <Image borderRadius="100%"
            src={`https://services.tzkt.io/v1/avatars2/${props.tzPublicKey}`}
          />
        </Box>
      </>
    );
  }
  
  function WalletDisplay() {
    const [, setLocation] = useLocation();
    const system = useSelector(s => s.system);
    const dispatch = useDispatch();
    if (system.status == 'WalletConnected') {
      return (
        <>
        <Flex>
        <WalletInfo tzPublicKey={system.tzPublicKey} />
        </Flex>
        </>
      );
    }
  }


  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
      bg="#ffffff"
    >
      
      <Flex mt="10%" flexDir="column" align="center" maxW="600px" pt={20} height="1100px">
        <Heading color="brand.darkGray" size="xl" pb={8}>
          This is the account page.
        </Heading>
        <Heading
          color="brand.darkGray"
          size="md"
          textAlign="center"
          fontFamily="Helvetica"
          pb={12}
          opacity=".8"
        >
          More info coming soon.
        </Heading>
      </Flex>
    </Flex>
  );
}

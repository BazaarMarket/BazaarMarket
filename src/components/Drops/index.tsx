import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image, Link } from '@chakra-ui/react';
import { MinterButton /* , MinterLink */ } from '../common';
import logo from '../../components/common/assets/logo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet } from '../../reducer/async/wallet';

export default function DropsPage() {

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
      bg="#ffffff"
    >
      
      <Flex mt="10%" flexDir="column" align="center" maxW="600px" pt={20} height="90vh">
        <Heading color="brand.darkGray" size="xl" pb={8}>
          This is the drops page.
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

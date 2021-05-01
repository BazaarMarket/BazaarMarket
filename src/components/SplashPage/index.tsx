import React from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image } from '@chakra-ui/react';
import { MinterButton } from '../common';
import BackgroundImage1 from '../SplashPage/CloversLeft.png';
import BackgroundImage2 from '../SplashPage/CloversRight.png';
import { useSelector, useDispatch } from '../../reducer';

export default function SplashPage() {
  const [, setLocation] = useLocation();
  
  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
    >
      <Flex height="90vh" flexDir="column" align="center">
        <Heading color="brand.darkGray" size="lg" pb={2} pt="30vh" mx="10vw" textAlign="center">
          Carbon-Offset NFTs on Tezos
        </Heading>
       
        <Heading
          color="brand.darkGray"
          size="md"
          textAlign="center"
          fontFamily="Helvetica"
          pb={4}
          mx="10vw"
          opacity=".8"
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
          mr="60vw"
          mt="70vh"
          position="absolute" 
        />
        <Image
          src={BackgroundImage2}
          align="right"
          height="20vh"
          ml="60vw"
          mt="70vh"
          position="absolute"
        />
      </Flex>
    </Flex>
  );
}

import React, { FunctionComponent, useState } from 'react';
import { useLocation } from 'wouter';
import { Flex, Text, Heading, Image, Modal, ModalCloseButton } from '@chakra-ui/react';
import { MinterButton } from '../common';
import BackgroundImage1 from '../SplashPage/CloversLeft.png';
import BackgroundImage2 from '../SplashPage/CloversRight.png';
import { useSelector, useDispatch } from '../../reducer';
//import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
//import { ReadOnlySigner, findDex } from "@quipuswap/sdk";
//import { estimateTezInToken } from "@quipuswap/sdk/src/estimates";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  
  /*function BdaoPrice() {
    const publicKeyHash = "tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A";
    const publicKey = "edpkvWbk81uh1DEvdWKR4g1bjyTGhdu1mDvznPUFE2zDwNsLXrEb9K";
  
    const tezos = new TezosToolkit("https://mainnet.smartpy.io");
    tezos.setPackerProvider(new MichelCodecPacker());
    tezos.setSignerProvider(new ReadOnlySigner(publicKeyHash, publicKey));
  
    const factories = {
      fa1_2Factory: "KT1WkKiDSsDttdWrfZgcQ6Z9e3Cp4unHP2CP",
      fa2Factory: "KT1Bps1VtszT2T3Yvxm5PJ6Rx2nk1FykWPdU",
    };
    const token = {
      contract: "KT1RX7AdYr9hFZPQTZw5Fu8KkMwVtobHpTp6",
      id: 0,
    };
  
    return(
      <Flex>
        <Text>
        {(async () => {
      try {
        const dex = await findDex(tezos, factories, token);
        const dexStorage = await dex.storage();
  
        const tokenValue = 4_000;
        const inTezValue = estimateTezInToken(dexStorage, tokenValue);
  
        return(inTezValue);
  
      } catch (err) {  
        console.error(err);
      }
    })}
        </Text>
      </Flex>
    ); 
  }*/

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

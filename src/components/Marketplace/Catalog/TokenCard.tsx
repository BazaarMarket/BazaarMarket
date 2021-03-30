import React from 'react';
import { Token } from '../../../reducer/slices/collections';
import { useLocation } from 'wouter';
import { ipfsUriToGatewayUrl } from '../../../lib/util/ipfs';
import { AspectRatio, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react';
import { TokenMedia } from '../../common/TokenMedia';
import VerificationCheck from '../../common/assets/VerifiedTag.png';

interface TokenCardProps extends Token {
  network: string;
}

export default function TokenCard(props: TokenCardProps) {
  const [, setLocation] = useLocation();
  let priceValue: any = 0;

  function VerifiedNFT() {
    if (props.sale?.seller.substr(-5) == "JwSno"){
      return (
        <Flex>
          <Image src={VerificationCheck} width="35px" position="absolute" top="15px" left="15px"/>
        </Flex>
      );
    }
    return (
      null
    );
  }

  function PricePoint(){
    int: priceValue = props.sale?.price;
    
    if(priceValue > 10) {
      return(
        <Flex
          p={2}  
          px={2}
          py={4}
          mx={2}
          bg="white"
          borderTop="1px solid"
          borderColor="brand.lightGray"
        >
          <Text fontSize="xs" p="2px" width="35%">Current Bid</Text>
          <NumberInput width="97%" size="sm" defaultValue={props.sale?.price} min={props.sale?.price} max={999}>
            <NumberInputField />
            <NumberInputStepper boxSize="1.5em">
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      );
    }
    return(
      <Flex
        px={2}
        py={4}
        mx={2}
        bg="white"
        borderTop="1px solid"
        borderColor="brand.lightGray"
        justify="space-between"
      >
        <Text fontSize="md">Current Price</Text>
        <Text fontSize="md" fontWeight="600">{props.sale?.price} ꜩ</Text>
      </Flex>
    );
  }

  return (
    <Flex
      flexDir="column"
      ratio={1}
      w="100%"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      borderRadius="30px"
      overflow="hidden"
      boxShadow="0px 0px 0px 4px rgba(15, 97, 255, 0)"
      transition="all linear 50ms"
      _hover={{
        cursor: 'pointer',
        boxShadow: '0px 0px 0px 4px rgba(15, 97, 255, 0.1)'
      }}
      onClick={() =>
        setLocation(`/collection/${props.address}/token/${props.id}`)
      }
    >
      <AspectRatio ratio={3 / 2}>
        <Box>
          <TokenMedia
            src={ipfsUriToGatewayUrl(props.network, props.artifactUri)}
          />
          <VerifiedNFT/>
        </Box>
      </AspectRatio>
      <Flex
        width="100%"
        px={4}
        py={4}
        bg="white"
        borderTop="1px solid"
        borderColor="brand.lightBlue"
        flexDir="column"
      >
        <Heading size="sm">{props.title}</Heading>
        <Text fontSize="sm">Seller: {props.sale?.seller.substr(0, 5)}...{props.sale?.seller.substr(-5)}</Text>
      </Flex>
      <PricePoint />
    </Flex>
  );
}

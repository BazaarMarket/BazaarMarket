import React from 'react';
import { Token } from '../../../reducer/slices/collections';
import { useLocation } from 'wouter';
import { ipfsUriToGatewayUrl } from '../../../lib/util/ipfs';
import { AspectRatio, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton } from '@chakra-ui/react';
  import { Columns, Plus, X, ArrowDownCircle, Codesandbox } from 'react-feather';
import { TokenMedia } from '../../common/TokenMedia';
import VerificationCheck from '../../common/assets/VerifiedTag.png';

interface TokenCardProps extends Token {
  network: string;
}

export default function TokenCard(props: TokenCardProps) {
  const [, setLocation] = useLocation();
  let priceValue: any = 0;
  let auctionType: any = "forSale";
  var verifiedUsers: string[] = ["2YnvZ", "HXV1m"];
  var verifiedUser: boolean = false;

  function VerifiedNFT() {
    for(var i: number = 0; i <= verifiedUsers.length; i++){
      if (props.metadata.minter && props.metadata.minter?.substr(-5) == verifiedUsers[i]){
        verifiedUser = true;
      }
    }
    if(verifiedUser){
      return (
        <Flex>
          <Image src={VerificationCheck} width="35px" position="absolute" top="15px" left="15px"/>
        </Flex>
      );
    }
    return (
      <></>
    );
  }

  function CarbonOffset() {
    if(props.carbonOffset != "0" && props.carbonOffset != null) {
      return (
      <>
        <Tag size="lg" key="md" variant="subtle" color="white" bgColor="brand.green" width="75%">
          <TagLeftIcon boxSize="12px" as={ArrowDownCircle} />
          <TagLabel>
            Carbon Offset: &nbsp;
            {props.carbonOffset ? props.carbonOffset : ' '}
            &nbsp; ꜩ
          </TagLabel>
        </Tag>
      </>
      );
    } else {
      return (
        <></>
      );
    }
  }

  function TokenType() {
    if(props.metadata.symbol)  {
      return (
        <>
          <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.blue" mr="auto" mt="1vh">
            <TagLeftIcon boxSize="1em" as={Codesandbox} />
            <TagLabel>
              {props.metadata.symbol}
            </TagLabel>
          </Tag>
        </>
        );
    } else {
      return (
        <>
        <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.green" mr="auto" mt="1vh">
            <TagLeftIcon boxSize="1em" as={Codesandbox} />
            <TagLabel>
              OpenMinter
            </TagLabel>
          </Tag>
        </>
      );
    }
  }

  function SaleType(){
    int: priceValue = props.sale?.price;
    string: auctionType = props.sale?.type;
    
    if(auctionType !== "fixedPrice") {
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
        <Text fontSize="md">Price:</Text>
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
        <Text fontSize="sm" >Seller: {props.sale?.seller.substr(0, 5)}...{props.sale?.seller.substr(-5)}</Text>
        <CarbonOffset/>
        <TokenType/>
      </Flex>
      <SaleType />
    </Flex>
  );
}

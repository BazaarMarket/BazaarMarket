import React, { useEffect, useState } from 'react';
import { Token } from '../../../reducer/slices/collections';
import { useLocation } from 'wouter';
import { IpfsGatewayConfig, ipfsUriToGatewayUrl } from '../../../lib/util/ipfs';
import { TokenMedia } from '../../common/TokenMedia';
import { 
  AspectRatio, 
  Box, 
  Flex, 
  Text, 
  Heading, 
  Image,
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  Tag,
  TagLabel,
  TagLeftIcon, } from '@chakra-ui/react';
  import { Columns, Plus, X, ArrowDownCircle, Codesandbox, Volume2, VolumeX } from 'react-feather';

  import VerificationCheck from '../../common/assets/VerifiedTag.png';

interface TokenMediaProps extends Token {
  config: IpfsGatewayConfig;
  maxW?: string;
  class?: string;
}

  interface TokenCardProps extends Token {
    config: IpfsGatewayConfig,
  }

export default function TokenCard(props: TokenCardProps) {
  const [, setLocation] = useLocation();
  let priceValue: any = 0;
  let auctionType: any = "forSale";
  var verifiedUsers: string[] = ["2YnvZ", "HXV1m"];
  var verifiedUser: boolean = false;

  const src = ipfsUriToGatewayUrl(props.config, props.artifactUri);
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
    })();
  }, [src]);

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
    if(props.title != "0" && props.title == "blep") {
      return (
      <>
        <Tag size="lg" key="md" variant="subtle" color="white" bgColor="brand.green" width="75%">
          <TagLeftIcon boxSize="12px" as={ArrowDownCircle} />
          <TagLabel>
            Carbon Offset: &nbsp;
            {props.title ? props.title : ' '}
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
        <Box bgColor="brand.darkGray">
          {obj && (/^video\/.*/.test(obj.type)) ? (
            <Flex position="absolute" ml="82%" mt="52%">
              <Volume2 size="25px" color="white"/>
            </Flex>
          ) : ( <></> )}
          <TokenMedia
            {...props}
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

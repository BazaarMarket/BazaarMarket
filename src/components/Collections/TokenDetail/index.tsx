import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useLocation } from 'wouter';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ResponsiveValue,
  Slider,
  SliderThumb,
  SliderFilledTrack,
  SliderTrack,
  Text,
  useDisclosure,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton
} from '@chakra-ui/react';
import { ChevronLeft, HelpCircle, MoreHorizontal, Star, ArrowDownCircle, DollarSign, ExternalLink, Maximize2, UserCheck, Codesandbox } from 'react-feather';
import { MinterButton, MinterMenuButton, MinterMenuItem } from '../../common';
import { TransferTokenModal } from '../../common/TransferToken';
import { SellTokenButton, CancelTokenSaleButton } from '../../common/SellToken';
import { BuyTokenButton } from '../../common/BuyToken';
import { ipfsUriToGatewayUrl, uriToCid } from '../../../lib/util/ipfs';
import { useSelector, useDispatch } from '../../../reducer';
import {
  getContractNftsQuery,
  getNftAssetContractQuery
} from '../../../reducer/async/queries';
import { NftMetadata } from '../../../lib/nfts/queries';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import { calculateSHA256Hash } from '@taquito/tzip16';

function NotFound() {
  return (
    <Flex flex="1" width="100%" justify="center">
      <Flex w="100%" flex="1" flexDir="column" align="center">
        <Flex
          px={32}
          py={16}
          bg="gray.100"
          textAlign="center"
          align="center"
          borderRadius="5px"
          flexDir="column"
          fontSize="xl"
          borderColor="gray.200"
          borderWidth="5px"
          mt={36}
          color="gray.300"
        >
          <HelpCircle size="100px" />
          <Heading size="xl" fontWeight="normal" pt={8} color="gray.400">
            Token not found
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}

function MediaNotFound() {
  return (
    <AspectRatio
      ratio={4 / 3}
      width="100%"
      borderRadius="3px"
      bg="gray.100"
      overflow="hidden"
    >
      <Flex flexDir="column" align="center" justify="center">
        <Box color="gray.300" pb={10}>
          <HelpCircle size="100px" />
        </Box>
        <Heading color="gray.300" size="xl">
          Image not found
        </Heading>
      </Flex>
    </AspectRatio>
  );
}

function TokenImage(props: {
  id?: string;
  src: string;
  width?: string;
  metadata: NftMetadata;
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  objectFit?: ResponsiveValue<any>;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onFetch?: (type: string) => void;
}) {
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(props.src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
      props.onFetch?.(blob.type);
    })();
  }, [props, props.onFetch, props.src]);

  if (errored) {
    return <MediaNotFound />;
  }
  if (!obj) return null;

  if (/^image\/.*/.test(obj.type)) {
    return (
      <Image
        id={props.id || 'assetImage'}
        key={props.id || 'assetImage'}
        src={props.src}
        objectFit={props.objectFit ?? "scale-down"}
        flex="1"
        margin="auto"
        height={props.height ?? "auto"}
        width={props.width ?? "auto"}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight ?? '75vh'}
        onError={() => setErrored(true)}
        onLoad={props.onLoad}
      />
    );
  }

  if (/^video\/.*/.test(obj.type)) {
    return (
      <video
        controls
        style={{
          margin: 'auto', height: props.height || "auto",
          width: props.width || "100%",
          maxWidth: props.maxWidth ?? 'unset',
          maxHeight: props.maxHeight ?? '70vh'
        }}
      >
        <source src={obj.url} type={obj.type} />
      </video>
    );
  }

  if (props.metadata.formats?.length) {
    if (props.metadata.formats[0].mimeType === 'model/gltf-binary' ||
      props.metadata.formats[0].mimeType === 'model/gltf+json'
    ) {
      return (
        <>
          <model-viewer
            auto-rotate
            camera-controls
            rotation-per-second="30deg"
            src={obj.url}
            class={props.id === "fullScreenAssetView" ? "fullscreen" : "individual"}
            style={{width: props.width || '100%', height: "65vh"}}
          ></model-viewer>
        </>
      );
    }
  }

  return <MediaNotFound />;
}

interface TokenDetailProps {
  contractAddress: string;
  tokenId: number;
}

function TokenDetail({ contractAddress, tokenId }: TokenDetailProps) {
  const [, setLocation] = useLocation();
  const { system, collections: state } = useSelector(s => s);
  const disclosure = useDisclosure();
  const dispatch = useDispatch();
  const collection = state.collections[contractAddress];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [zoom, setZoom] = useState(0);
  const [initialZoom] = useState(0);
  const [imageHeight] = useState(0);
  const [imageWidth] = useState(0);
  const [mediaType] = useState('');

  const collectionUndefined = collection === undefined;

  useEffect(() => {
    if (collectionUndefined) {
      dispatch(getNftAssetContractQuery(contractAddress));
    } else {
      dispatch(getContractNftsQuery(contractAddress));
    }
  }, [contractAddress, tokenId, collectionUndefined, dispatch]);

  useEffect(() => {
    const img = document.getElementById('fullScreenAssetView');
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    const isPortrait = wHeight > wWidth;

    if (img && zoom !== 0 && zoom !== initialZoom) {
      img.style.maxWidth = `${imageWidth}px`;
      img.style.width = `${imageWidth * zoom}px`;
      img.style.height = `${imageHeight * zoom}px`;
      if (isPortrait && imageHeight > imageWidth) {
        img.style.margin = `calc((((${imageHeight - wHeight
          }px) / 2) * ${initialZoom} - 80px) * ${1 - zoom}) auto`;
      }
    }
  }, [imageHeight, imageWidth, initialZoom, zoom]);

  if (!collection?.tokens) {
    return null;
  }

  const token = collection.tokens.find(token => token.id === tokenId);
  if (!token) {
    return <NotFound />;
  }

  var verifiedUsers: string[] = ["2YnvZ", "HXV1m"];
  var verifiedUser: boolean = false;

  return (
    <Flex flex="1" width="100%" minHeight="90vh">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalContent
          height="100vh"
          maxHeight="100vh"
          width="100vw"
          display="flex"
          flexDirection="column"
          flexWrap="nowrap"
          justifyContent="center"
          alignItems="center"
          position="relative"
          backgroundColor="#333333f9"
          zIndex="2000"
          margin="0 !important"
          borderRadius="0"
        >
          {/^image\/.*/.test(mediaType) ? (
            <Flex
              height="3rem"
              alignItems="center"
              position="sticky"
              top={0}
              left={0}
            >
              <Slider
                defaultValue={initialZoom}
                min={initialZoom}
                max={1}
                step={0.01}
                width="10rem"
                margin="auto"
                onChange={setZoom}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Flex>
          ) : (
            ''
          )}

          <TokenImage
            id="fullScreenAssetView"
            src={ipfsUriToGatewayUrl(system.config, token.artifactUri)}
            metadata={token.metadata}
            width="auto"
            height="auto"
            maxWidth="90vw"
            maxHeight="100vh"
            objectFit="contain"
          />
          <ModalCloseButton position="absolute" right="0 !important" bottom="0 !important" display="block !important" fontSize="18px" top="unset" borderLeft="2px solid #aaa" color="white" borderTop="2px solid #aaa" width="4rem" height="4rem" borderRight="none" borderBottom="none" borderBottomStartRadius="0" borderBottomEndRadius="0" borderTopEndRadius="0" border="0" />
        </ModalContent>
      </Modal>
      
      <Flex flexDir="column" w="50%" minHeight="90vh">
        <Flex px={8} mx={8}>
          <MinterButton
            variant="primaryActionInverted"
            onClick={e => {
              e.preventDefault();
              setLocation('/collections', { replace: true });
            }}
          >
            <Box color="currentcolor">
              <ChevronLeft size={16} strokeWidth="3" />
            </Box>
            <Text ml={2}>Collections</Text>
          </MinterButton>
        </Flex>
        <Flex align="center" justify="center" flex="1" px={16}>
            <Box             
            width="100%"
            borderRadius="30px"
            borderWidth="1px"
            borderColor="brand.lightBlue"
            boxShadow="0 0 5px rgba(0,0,0,.15)"
            overflow="hidden">
              <Button 
              position="absolute"
              py={6}
              ml="1.25vw"
              mt="2.5vh"
              borderRadius="10px"
              bgColor="rgba(40,43,48, 0.7)"
              onClick={onOpen}
              >
                <Maximize2 color="white" size={30} strokeWidth="3" />
              </Button>
              <TokenImage
                src={ipfsUriToGatewayUrl(system.config, token.artifactUri)}
                metadata={token.metadata}
              />
            </Box>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="50%" minHeight="90vh">
        <Flex
          flexDir="column"
          px={8}
          pt={8}
          flex="1"
          align="center" justify="center"
        >
          <Flex
            flexDir="column"
            w="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.lightBlue"
            borderTopRadius="30px"
            py={6}
            pos="relative"
          >
            {system.tzPublicKey &&
            (system.tzPublicKey === token.owner ||
              system.tzPublicKey === token.sale?.seller) ? (
              <Flex>
                <Flex
                  py={1}
                  px={3}
                  mb={6}
                  mt={2}
                  borderRightRadius="5px"
                  bg="brand.blue"
                  color="white"
                  align="center"
                  justify="center"
                >
                  <Star fill="white" color="white" size={17} />
                  <Text fontWeight="600" mx={3} fontSize="md">
                    You own this asset
                  </Text>
                </Flex>
              </Flex>
            ) : null}
            <Flex
              justify="space-between"
              align="center"
              w="100%"
              px={8}
              pb={6}
            >
              <Flex flexDir="column">
                <Heading color="black" size="lg">
                  {token.title}
                </Heading>
                <Flex>
                <Text color="brand.lightGray" fontWeight="bold">
                  Collection: &nbsp;
                </Text>
                <Text color="brand.blue">
                  {collection.metadata.name || collection.address}
                </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              px={8}
              py={6}
              fontSize="1rem"
            >
              {token.description ? (
                token.description
              ) : (
                <Text fontSize="md" color="brand.gray">
                  No description provided
                </Text>
              )}
            </Flex>

            <Accordion allowToggle             
            w="100%"
            px={8}>
              <AccordionItem border="none">
                <AccordionButton mt={[4, 8]} p={0}>
                  <Text color="brand.neutralGray">Metadata</Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {token.metadata?.attributes?.map(({ name, value }) => (
                    <Flex mt={[4, 8]}>
                      <Text color="brand.neutralGray">{name}:</Text>
                      <Text color="brand.darkGray" fontWeight="bold" ml={[1]}>{value}</Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Flex flexDir="column" px={8} pt={6}>
              <Text
                pb={2}
                fontSize="xs"
                color="brand.gray"
                textTransform="uppercase"
              >
                Minter
              </Text>
              <Link
                href={"https://tzkt.io/" + token.metadata?.minter}
                color="brand.darkGray"
                isExternal
                ml={2}
              >
                <Flex flexDir="row" mr="auto" alignContent="right">
                  <Text mr="5px">{token.metadata?.minter || 'Minter Unknown'}</Text>
                  <ExternalLink size={16} />
                </Flex>
              </Link>
              
              <Text
                py={2}
                fontSize="xs"
                color="brand.gray"
                textTransform="uppercase"
              >
                IPFS Hash
              </Text>
              <Link
                href={"https://cloudflare-ipfs.com/ipfs/" + uriToCid(token.artifactUri)}
                color="brand.darkGray"
                isExternal
                ml={2}
              >
                <Flex flexDir="row" mr="auto" alignContent="right">
                  <Text mr="5px">{uriToCid(token.artifactUri) || 'No IPFS Hash'}</Text>
                  <ExternalLink size={16} />
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Flex 
            flexDir="column"
            w="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.lightBlue"
            borderTopColor="white"
            borderBottomRadius="30px"
            py={6}
            pos="relative">
          <Box
            w="100%"
            bg="white"
            py={6}
            px={8}
          >
            <Flex>
              <Box flex="1">
                <Heading
                  pb={2}
                  fontSize="xs"
                  color="brand.gray"
                  textTransform="uppercase"
                >
                  Market status
                </Heading>
                {token.sale ? (
                  <Text color="black" fontSize="lg">
                    For sale
                  </Text>
                ) : (
                  <Text color="black" fontSize="lg">
                    Not for sale
                  </Text>
                )}
              </Box>
              {token.sale ? (
                <Box flex="1">
                  <Heading
                    pb={2}
                    fontSize="xs"
                    color="brand.gray"
                    textTransform="uppercase"
                  >
                    Price
                  </Heading>
                  <Text color="black" fontSize="lg">
                    ꜩ {token.sale.price}
                  </Text>
                </Box>
              ) : null }
             
              {system.tzPublicKey &&
              (system.tzPublicKey === token.owner ||
                system.tzPublicKey === token.sale?.seller) ? (
                <Box>
                  {token.sale ? (
                    <CancelTokenSaleButton
                      contract={contractAddress}
                      tokenId={tokenId}
                    />
                  ) : (
                    <Flex>
                      <Box pos="absolute" top={6} right={6}>
                        <TransferTokenModal
                          contractAddress={contractAddress}
                          tokenId={tokenId}
                          disclosure={disclosure}
                        />
                      </Box>
                      <MinterButton 
                        backgroundColor="brand.blue"
                        color="white" 
                        fontSize="20px" 
                        width="150px" 
                        mr="10px"
                        onClick={disclosure.onOpen}
                      >
                        Transfer
                      </MinterButton>
                    <SellTokenButton
                      contract={contractAddress}
                      tokenId={tokenId}
                    />
                    </Flex>
                  )}
                </Box>
              ) : token.sale ? (
                <BuyTokenButton contract={contractAddress} token={token} />
              ) : null}
            </Flex>
          </Box>
          <Flex
            w="100%"
            my={6}
            px={8}
          >
            {token.title && token.title == "blep" ? (
              <Tag size="lg" key="md" variant="subtle" color="black" bgColor="brand.green" mx={3}>
                <TagLeftIcon boxSize="12px" as={ArrowDownCircle} />
                <TagLabel>
                  Carbon Offset: &nbsp;
                  {token.title ? (token.title) : ''}
                  &nbsp; ꜩ
                </TagLabel>
              </Tag>) : <></>}
              {token.title == "charity" ? (
                <Tag size="lg" key="md" variant="subtle" color="white" bgColor="brand.red" mx={3}>
                <TagLeftIcon boxSize="12px" as={DollarSign} />
                <TagLabel>
                  Charity
                </TagLabel> 
              </Tag> ) : <></>}
              {token.metadata.minter && token.metadata.minter?.substr(-5) == "VERIF" ? (
                <Tag size="lg" key="md" variant="subtle" color="black" bgColor="brand.yellow" mx={3}>
                <TagLeftIcon boxSize="12px" as={UserCheck} />
                <TagLabel>
                  Verified
                </TagLabel> 
              </Tag>
              ) : <></>}
             {token.metadata.symbol ? (
        <>
          <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.blue" mr="auto" mt="1vh">
            <TagLeftIcon boxSize="1em" as={Codesandbox} />
            <TagLabel>
              {token.metadata.symbol}
            </TagLabel>
          </Tag>
        </>
        ) : (
          <>
        <Tag align="left" size="lg" key="md" variant="subtle" color="white" bgColor="brand.green" mr="auto" mt="1vh">
            <TagLeftIcon boxSize="1em" as={Codesandbox} />
            <TagLabel>
              OpenMinter
            </TagLabel>
          </Tag>
        </>
        )}
          </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TokenDetail;

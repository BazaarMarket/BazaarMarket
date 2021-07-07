import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  Flex, 
  Heading, 
  SimpleGrid, 
  Spinner, 
  Input, 
  InputRightElement, 
  InputGroup, 
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  RadioGroup,
  Stack,
  Radio,
  Tooltip,
  Button } from '@chakra-ui/react';
import { Wind, Search, Filter, ArrowRight, ArrowDown, DollarSign, Sliders } from 'react-feather';
import { useSelector, useDispatch } from '../../../reducer';
import { getMarketplaceNftsQuery, loadMoreMarketplaceNftsQuery } from '../../../reducer/async/queries';
import TokenCard from './TokenCard';
import { VisibilityTrigger } from '../../common/VisibilityTrigger';

export default function Catalog() {
  const { system, marketplace: state } = useSelector(s => s);
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    dispatch(getMarketplaceNftsQuery(state.marketplace.address));
  }, [ state.marketplace.address, dispatch ]);

  const loadMore = () => {
    dispatch(loadMoreMarketplaceNftsQuery({}));
  };

  let tokens = state.marketplace.tokens?.filter(x=>x.token).map(x=>x.token!) ?? [];

  function ShowFilters() {
    
    if (show){
      return (
        <Flex alignSelf="center">
              <Button 
                leftIcon={
                <Box fontSize="12px" fontWeight="bold" width="30px">
                  <Text float="left">A</Text>
                  <Text float="right">Z</Text>
                  <Box>
                    <ArrowRight size="1em"/>
                  </Box>
                  
                </Box>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Name 
              </Button>
              <Button 
                leftIcon={<ArrowDown size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Price
              </Button>
              <Button 
                leftIcon={<Sliders size="1em"/>}
                bg="white" 
                borderColor="lightGray" 
                borderWidth="1px" 
                borderRadius="3px" 
                fontWeight="normal"
                m="5px" 
                mb="25px" 
                height="1em" 
                p="15px" >
                Category 
              </Button>
        </Flex>
      );
    }
    return(
      <>
        <Flex mb="25px">
        </Flex>
      </>
    );
  }

  function SearchBar() {
    return(
      <>
      <Flex  alignSelf="center" mt="20px" mb="25px">
      <Box borderColor="lightGray" borderWidth="1px" borderRadius="50px" width="500px" p="5px" pl="10px" bg="white"> 
        <Box float="left" pt="3px">
          <Search color="lightGray"/>
        </Box>
        <Box float="left" pt="4px">
          <InputGroup>
            <Input variant="unstyled" placeholder="Search NFTs..." ml="10px" color="lightGray" width="440px"/>
            <InputRightElement width="4.5rem" float="right">
              <Button h="1.5rem" size="sm" onClick={handleClick} float="right" mb="20px" borderRadius="100px">
                {show ? "Clear" : 
                  <Flex pr="2px">
                    <Box p="2px">
                      <Filter size="1em"/>
                    </Box>
                    Filters
                  </Flex>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Flex>
    <ShowFilters />
    </>
    );
  }

  const [sliderValue, setSliderValue] = React.useState(100)
  const handleSliderChange = (value: number) => setSliderValue(value)

  const [tokenValue, setTokenValue] = React.useState("1")
  const handleRadioChange = (value: string) => setTokenValue(value)

  return (
    <Flex
      w="100%"
      minH="90vh"
      bg="brand.brightGray"
      px={5}
      pt={6}
      overflowY="scroll"
      justify="start"
      flexDir="column"
    > 
    {/*------ Price Slider ------*/}
      <Flex alignSelf="center">
      <Text mr={5} fontWeight="bold">
        Price:
      </Text>
      <Slider 
        aria-label="slider-ex-4" 
        defaultValue={100} width="30vw" 
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
      >
        <SliderTrack bg="blue.100">
          <SliderFilledTrack bg="brand.blue" />
        </SliderTrack>
          <SliderThumb 
            fontSize="sm" 
            boxSize="32px" 
            children={
              sliderValue > 0 ? (
                sliderValue < 100 ? (
                  sliderValue*2+"ꜩ"
                ) : ("∞ꜩ")
                ) : ("Free")}
          />
      </Slider>
      </Flex>

    {/*------ Token Filter ------*/}
    <Flex alignSelf="center" mt={2}>
      <Text mr={5} fontWeight="bold">
        Tokens:
      </Text>
        <RadioGroup defaultValue={"1"}  value={tokenValue} onChange={handleRadioChange}>
          <Stack direction="row">
            <Radio colorScheme="blue" value="1">
              All
            </Radio>
            <Radio colorScheme="blue" value="2">
              Bazaar
            </Radio>
            <Radio colorScheme="blue" value="3">
              ByteBlock
            </Radio>
            <Radio colorScheme="blue" value="4">
              OpenMinter
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>

      <Container maxW="100em">
        <Flex
          flex="1"
          w="100%"
          flexDir="column"
          mt="5vh"
        >
          {!state.marketplace.loaded ? (
            <Flex flexDir="column" align="center" flex="1" pt={20}>
              <Spinner size="xl" mb={6} color="gray.300" />
              <Heading size="lg" textAlign="center" color="gray.500">
                Loading...
              </Heading>
            </Flex>
          ) :
            tokens.length === 0 ? (
            <Flex w="100%" flex="1" flexDir="column" align="center">
              <Flex
                px={20}
                py={10}
                bg="gray.200"
                textAlign="center"
                align="center"
                borderRadius="5px"
                flexDir="column"
                fontSize="xl"
                color="gray.400"
                mt={28}
              >
                <Wind />
                <Text fontWeight="600" pt={5}>
                  No tokens to display in this marketplace
                </Text>
              </Flex>
            </Flex>
            ) : (
              <>
                <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} gap={8} pb={8}>
                  <>
                    {
                    tokens.slice(0).map(token => {
                      if (token && token.sale) {
                          if (token.sale.price <= sliderValue*2 || sliderValue == 100 ){
                            if (tokenValue == "1") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "2" && token.metadata.symbol == "BATOs") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "3" && token.address == "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            } else if (tokenValue == "4" && token.metadata.symbol !== "BATOs" && token.address !== "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq") {
                              return (
                                <TokenCard
                                  key={`${token.address}-${token.id}`}
                                  config={system.config}
                                  {...token}
                                />
                              );
                            }
                          }
                      }
                    })}
                    <VisibilityTrigger key={state.marketplace.tokens?.length + ':' + tokens.length} onVisible={loadMore} allowedDistanceToViewport={600}/>
                  </>
                </SimpleGrid>
              </>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}

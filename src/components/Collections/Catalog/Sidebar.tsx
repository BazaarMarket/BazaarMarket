import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { CreateCollectionButton } from '../../common/CreateCollection';
import { useSelector, useDispatch } from '../../../reducer';
import {
  selectCollection,
  Collection
} from '../../../reducer/slices/collections';
import { 
  ChevronLeft, 
  HelpCircle, 
  Star, 
  ArrowDownCircle, 
  DollarSign, 
  ExternalLink, 
  Maximize2, 
  UserCheck, 
  Codesandbox,
  Square, 
  RefreshCw, 
  UserX,
  Tag as TagIcon,
  ChevronRight} from 'react-feather';
import { custom } from 'joi';

interface CollectionTabProps extends Collection {
  selected: boolean;
  onSelect: (address: string) => void;
}

function CollectionTab({
  address,
  metadata,
  selected,
  onSelect
}: CollectionTabProps) {
  return (
    <Flex
      align="center"
      py={2}
      px={4}
      bg={selected ? 'gray.100' : 'white'}
      color={selected ? 'black' : 'gray.600'}
      _hover={{
        cursor: 'pointer',
        color: selected ? 'black' : 'gray.800'
      }}
      onClick={() => onSelect(address)}
      role="group"
    >
      <Flex
        align="center"
        justify="center"
        w={8}
        h={8}
        bg={selected ? 'brand.blue' : 'gray.100'}
        color={selected ? 'white' : 'gray.400'}
        borderRadius="100%"
        fontWeight="600"
        _groupHover={{
          bg: selected ? 'brand.blue' : 'gray.200'
        }}
      >
        {address === "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq" ? (
          <>
          <Square height={20}/>
          </>
        ) : (
          <>
          <Codesandbox height={20}/>
          </>
        )}
      </Flex>
      <Text pl={4} fontWeight={selected ? '600' : '600'}>
        {metadata?.name || address}
      </Text>
    </Flex>
  );
}

interface CustomCollectionTabProps extends Collection {
  selected: boolean;
  onSelect: (address: string) => void;
  customName: string;
}

function CustomCollectionTab({
  address,
  metadata,
  customName,
  selected,
  onSelect
}: CustomCollectionTabProps) {
  return (
    <Flex
      align="center"
      py={2}
      px={4}
      bg={selected ? 'gray.100' : 'white'}
      color={selected ? 'black' : 'gray.600'}
      _hover={{
        cursor: 'pointer',
        color: selected ? 'black' : 'gray.800'
      }}
      onClick={() => onSelect(address)}
      role="group"
    >
      <Flex
        align="center"
        justify="center"
        w={8}
        h={8}
        bg={selected ? 'brand.blue' : 'gray.100'}
        color={selected ? 'white' : 'gray.400'}
        borderRadius="100%"
        fontWeight="600"
        _groupHover={{
          bg: selected ? 'brand.blue' : 'gray.200'
        }}
      >
        {customName === "Bazaar Minter" ? (
          <Flex mt="0.18em" ml="0.18em">
          <TagIcon strokeWidth={3} height={18} />
          </Flex>
        ) :
        (customName === "ByteBlock Minter" ? (
          <>
          <Square strokeWidth={4} height={16}/>
          </>
        ) : 
        (customName === "OpenMinter" ? (
          <>
          <ChevronRight strokeWidth={3} height={20}/>
          </>
        ) : (
          <>
          <Codesandbox height={20}/>
          </>
        )))}
      </Flex>
      <Text pl={4} fontWeight={selected ? '600' : '600'}>
        {customName}
      </Text>
    </Flex>
  );
}

export default function Sidebar() {
  const state = useSelector(s => s.collections);
  const dispatch = useDispatch();
  return (
    <>
      <Heading px={4} pt={6} pb={4} size="md" color="brand.darkGray">
        Collections
      </Heading>
      <Heading
        fontFamily="mono"
        px={4}
        pb={2}
        fontSize="sm"
        color="brand.darkGray"
      >
        Featured
      </Heading>
      <CustomCollectionTab
        customName="Bazaar Minter"
        selected={"KT1PKvHNWuWDNVDtqjDha4AostLrGDu4G1jy" === state.selectedCollection}
        onSelect={address => dispatch(selectCollection("KT1PKvHNWuWDNVDtqjDha4AostLrGDu4G1jy"))}
        {...state.collections["KT1PKvHNWuWDNVDtqjDha4AostLrGDu4G1jy"]}
      />
      <CustomCollectionTab
        customName="ByteBlock Minter"
        selected={"KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq" === state.selectedCollection}
        onSelect={address => dispatch(selectCollection("KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq"))}
        {...state.collections["KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq"]}
      />
      <CustomCollectionTab
        customName="OpenMinter"
        selected={"KT1QcxwB4QyPKfmSwjH1VRxa6kquUjeDWeEy" === state.selectedCollection}
        onSelect={address => dispatch(selectCollection("KT1QcxwB4QyPKfmSwjH1VRxa6kquUjeDWeEy"))}
        {...state.collections["KT1QcxwB4QyPKfmSwjH1VRxa6kquUjeDWeEy"]}
      />
      <Heading
        fontFamily="mono"
        px={4}
        pt={4}
        pb={2}
        fontSize="sm"
        color="brand.darkGray"
      >
        Your Collections
      </Heading>
      {Object.keys(state.collections)
        .filter(address => address !== state.globalCollection)
        .map(address => (
          <>
          {address !== "KT1QcxwB4QyPKfmSwjH1VRxa6kquUjeDWeEy" && 
           address !== "KT1PKvHNWuWDNVDtqjDha4AostLrGDu4G1jy" &&
           address !== "KT1MxGrhSmLPe4W842AutygvuoxUejLJDuWq" ? 
           (
           <>
           <CollectionTab
            key={address}
            selected={address === state.selectedCollection}
            onSelect={address => dispatch(selectCollection(address))}
            {...state.collections[address]}
          />
           </>
           ) : (<></>)}
          </>
        ))}
      <Flex px={2} pt={4} justify="center" pb={8}>
        <CreateCollectionButton />
      </Flex>
    </>
  );
}

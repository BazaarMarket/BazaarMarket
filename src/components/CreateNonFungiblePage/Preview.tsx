import React from 'react';
import { 
  Divider, 
  Heading, 
  Flex, 
  Text,   
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton, } from '@chakra-ui/react';
  import { Columns, Plus, X, ArrowDownCircle } from 'react-feather';
import { useSelector } from '../../reducer';
import { FilePreview } from './FileUpload';

export default function Preview() {
  const selectedFile = useSelector(s => s.createNft.selectedFile);
  const name = useSelector(s => s.createNft.fields.name);
  const description = useSelector(s => s.createNft.fields.description);
  
  return (
    <Flex
      flexDir="column"
      width="530px"
      bg="white"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="25px"
      boxShadow="0px 0px 0px 4px rgba(211, 222, 245, 0.3)"
    >
      <Flex
        justify="center"
        align="center"
        width="100%"
        height="100%"
        overflow="hidden"
        borderTopRadius="25px"
      >
        {selectedFile ? <FilePreview file={selectedFile} /> : null}
      </Flex>
      <Heading size="md" color={name ? 'black' : 'gray.200'} px={8} py={6} borderTopWidth="1px" borderColor="gray.300">
        {name ? name : ' '}
      </Heading>
      <Divider opacity="1" />
      <Text
        px={8}
        py={6}
        color={description ? 'black' : 'gray.300'}
        fontFamily="mono"
      >
        {description ? description : ''}
      </Text>
      <Text
        px={8}
        py={6}
        color={description ? 'black' : 'gray.500'}
        fontFamily="mono"
      >
      </Text>
      {/* TODO: Render metadata in preview */}
    </Flex>
  );
}

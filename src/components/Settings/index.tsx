import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

export default function SettingsPage() {

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
          You found the settings page!
        </Heading>
        <Heading
          color="brand.darkGray"
          size="md"
          textAlign="center"
          fontFamily="Helvetica"
          pb={12}
          opacity=".8"
        >
          It's not ready yet, but good for you
        </Heading>
      </Flex>
    </Flex>
  );
}

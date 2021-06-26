import React from 'react';
import { 
  Accordion, 
  AccordionButton, 
  AccordionIcon, 
  AccordionItem, 
  AccordionPanel, 
  Box, 
  Flex, 
  Text,
  Heading,  
  Link, } from '@chakra-ui/react';

export default function WertPage() {
  return (
    <Flex
      align="center"
      alignSelf="center"
      justifyContent="space-between"
      flex="1"
      flexDir="column"
      bg="#ffffff"
      width="99vw" minHeight="90vh"
    >
        <Heading mt="6vh">
          Purchase Tezos on Bazaar!
        </Heading>
        <Text  mt="1.5vh">
          Powered by <Link href="https://wert.io/" color="brand.blue"> Wert.io </Link>
        </Text>
        <iframe 
          src="https://widget.wert.io/01F8YT5VWTY38S9AKBEKKJYKDJ/widget?commodities=XTZ&color_buttons=%234BA0D4&color_icons=%234BA0D4&color_links=%234BA0D4&color_success=%2327B278&color_warning=%23FACB43&color_error=%23eb586f" 
          allow="cross-origin-isolated 'none'"
          width="100%"
          height="100%"
        ></iframe>
    </Flex>
  );
}
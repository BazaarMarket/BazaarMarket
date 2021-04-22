import React from 'react';
import { useLocation } from 'wouter';
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer
} from '@chakra-ui/react';
import { ChevronDown, Package, Plus, GitHub, ExternalLink } from 'react-feather';
import footerLogo from './assets/footerLogo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet } from '../../reducer/async/wallet';
import { disconnectWallet } from '../../reducer/async/wallet';
import { MinterButton /* , MinterLink */ } from '.';

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function FooterLink(props: HeaderLinkProps) {
  const [location, setLocation] = useLocation();
  const selected = location === props.to;
  return (
    <Link
      href={props.to}
      onClick={e => {
        e.preventDefault();
        setLocation(props.to);
      }}
      textDecor="none"
      borderRadius="10px"
      alignItems="center"
      fontWeight="600"
      //px={3}
      //py={2}
      mr={4}
      //bg={selected ? 'brand.blue' : 'white'}
      //color={selected ? 'white' : 'brand.blue'}
      display="flex"
      transition="none"
      _hover={{
        textDecor: 'none',
        //bg: 'gray.700',
        //color: selected ? 'gray.400' : 'gray.100'
      }}
    >
      {props.children}
    </Link>
  );
}

export function Footer() {
  const [location, setLocation] = useLocation();
  /*if (location === '/' || location === '') {
    return null;
  }*/
  return (
    <Flex bg="brand.darkGray" maxH="250px" padding="50px" color="white">
      <footer>
      <Flex display="block">
      <Image
        width="150px"
        src={footerLogo}
        cursor="pointer"
        align="right"
      />
      <Text display="block" fontSize="14px" pt="20px" fontWeight="bold">
        Sitemap:
      </Text>
      <Link href="/" display="block" fontSize="12px" pt="10px">
        Home
      </Link>
      <Link href="/about" display="block" fontSize="12px" pt="10px">
        About
      </Link>
      <Link href="/marketplace" display="block" fontSize="12px" pt="10px" pb="12px">
        Marketplace
      </Link>
      </Flex>
      <Flex>

      </Flex>
      </footer>
    </Flex>
  );
}

export default Footer;

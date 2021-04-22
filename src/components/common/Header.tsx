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
import headerLogo from './assets/logo.svg';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet } from '../../reducer/async/wallet';
import { disconnectWallet } from '../../reducer/async/wallet';
import { MinterButton /* , MinterLink */ } from '../common';

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function HeaderLink(props: HeaderLinkProps) {
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

function WalletInfo(props: { tzPublicKey: string }) {
  return (
    <>
      <Box borderRadius="100%" width="50px" height="50px" bg="white">
        <Image borderRadius="100%"
          src={`https://services.tzkt.io/v1/avatars2/${props.tzPublicKey}`}
        />
      </Box>
    </>
  );
}

function WalletDisplay() {
  const [, setLocation] = useLocation();
  const system = useSelector(s => s.system);
  const dispatch = useDispatch();
  if (system.status !== 'WalletConnected') {
    return (
      <>
      <Link>
          <MinterButton            
            backgroundColor="brand.blue"
            color="white"
            m="5px"
            onClick={e => {
              e.preventDefault();
              dispatch(connectWallet());
            }}
          >
            <Text m={2} fontSize="20px" fontWeight="bold">Login</Text>
          </MinterButton>
      </Link>
    </>
    );
  }
  return (
    <>
      <HeaderLink to="/create">
        <Box color="brand.blue" mr="2" pl="2">
          <Plus size={30} strokeWidth="3" />
        </Box>
      </HeaderLink>
      
      <Menu>
        <MenuButton>
          <WalletInfo tzPublicKey={system.tzPublicKey} />
        </MenuButton>
        <MenuList>
          <MenuItem
            color="brand.black"
            onClick={() => {
              setLocation('/account');
            }}>
            My Account
          </MenuItem>
          <MenuItem
            color="brand.black"
            onClick={() => {
              setLocation('/collections');
            }}>
            Collections
          </MenuItem>
          <MenuItem
            color="brand.red"
            onClick={async () => {
              await dispatch(disconnectWallet());
              setLocation('/');
            }}
          >
            <Text color="brand.red">
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export function Header() {
  const [location, setLocation] = useLocation();
  /*if (location === '/' || location === '') {
    return null;
  }*/
  return (
    <Flex
      width="100%"
      bg="white"
      paddingX={10}
      paddingY={6}
      height="10vh"
    >
      
      <Image
        width="200px"
        src={headerLogo}
        cursor="pointer"
        align="right"
        onClick={ function() {
          window.location.href = '/';
          }
        }
      />

      <Flex width="100%" alignSelf="right">
        
        <Spacer />
        
        <HeaderLink to="/marketplace">
          <Text m={2}>Marketplace</Text>
        </HeaderLink>
        
        <HeaderLink to="/drops">
          <Text m={2}>Drops</Text>
        </HeaderLink>

        <HeaderLink to="/about">
          <Text m={2}>About</Text>
        </HeaderLink>

        <Link href="https://discord.gg/mnYZwv8s5a" isExternal fontWeight="bold" p="5px" pt="6px" mt="5px">
          Discord 
          <Flex p="2px" float="right">
            <ExternalLink size="10px"/>
          </Flex>
        </Link>   
        
        <Link href="https://github.com/FacioErgoSum/Bazaar-Marketplace" isExternal pl="20px" pr="20px" mt="14px" size="30px" stroke="100">
          <GitHub/>
        </Link>
      
      </Flex>
      
      <Flex flex="1" alignSelf="right" color="brand.blue">
        <WalletDisplay />
      </Flex>
    
    </Flex>
  );
}

export default Header;

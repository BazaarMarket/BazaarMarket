import React, { useRef } from 'react';
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
  Spacer,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading
} from '@chakra-ui/react';
import { ChevronDown, Package, Plus, GitHub, ExternalLink, Menu as HamburgerIcon } from 'react-feather';
import { RiStore2Line } from 'react-icons/ri';
import { MdCollections } from 'react-icons/md';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet, disconnectWallet } from '../../reducer/async/wallet';
import { MinterButton } from '../common';
import headerLogo from './assets/logo.svg';

interface MobileHeaderLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function MobileHeaderLink(props: MobileHeaderLinkProps) {
  const [location, setLocation] = useLocation();
  const selected = location === props.to;
  return (
    <Link
      href={props.to}
      onClick={e => {
        e.preventDefault();
        setLocation(props.to);
        if (props.onClick) {
          props.onClick();
        }
      }}
      textDecor="none"
    >
      <Heading
        fontWeight={selected ? '600' : 'normal'}
        color="brand.background"
        mb={4}
        pl={selected ? 4 : 0}
        borderLeft={selected ? '5px solid' : 'none'}
        borderColor="brand.blue"
      >
        {props.children}
      </Heading>
    </Link>
  );
}

interface DesktopHeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function DesktopHeaderLink(props: DesktopHeaderLinkProps) {
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
  const { config, tzPublicKey, wallet } = useSelector(s => s.system);
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
      <DesktopHeaderLink to="/create">
        <Box color="brand.blue" mr="2" pl="2">
          <Plus size={30} strokeWidth="3" />
        </Box>
      </DesktopHeaderLink>
      
      <Menu>
        <MenuButton>
          <WalletInfo tzPublicKey={system.tzPublicKey} />
        </MenuButton>
        <MenuList>
          <MenuItem color="brand.black">
            <Link
              href={"https://tzkt.io" + '/' + system.tzPublicKey}
              color="brand.darkGray"
              isExternal
              ml={2}
            >
              <Flex flexDir="row" mr="auto" alignContent="right">
                <Text pr="5px">
                  Account Info
                </Text>
                <ExternalLink size={16} />
              </Flex>
            </Link>
          </MenuItem>
          <MenuItem
            color="brand.black"
            onClick={() => {
              setLocation('/collections');
            }}>
            My Collections
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
        
        <DesktopHeaderLink to="/marketplace">
          <Text m={2}>Marketplace</Text>
        </DesktopHeaderLink>
        
        <DesktopHeaderLink to="/drops">
          <Text m={2}>Drops</Text>
        </DesktopHeaderLink>

        <DesktopHeaderLink to="/about">
          <Text m={2}>About</Text>
        </DesktopHeaderLink>

        <Link href="https://discord.gg/mnYZwv8s5a" isExternal fontWeight="bold" p="5px" pt="6px" mt="5px">
          Discord 
          <Flex p="2px" float="right">
            <ExternalLink size="10px"/>
          </Flex>
        </Link>   
        
        <Link href="https://github.com/BazaarMarket/Bazaar-Market" isExternal pl="20px" pr="20px" mt="14px" size="30px" stroke="100">
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

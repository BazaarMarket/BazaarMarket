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
import { ChevronDown, Package, Plus, GitHub, Server, ExternalLink, Menu as HamburgerIcon } from 'react-feather';
import { RiStore2Line, RiDiscordLine, RiTwitterLine } from 'react-icons/ri';
import { MdCollections } from 'react-icons/md';
import { FaDiscord } from 'react-icons/fa';
import { useSelector, useDispatch } from '../../reducer';
import { connectWallet, disconnectWallet } from '../../reducer/async/wallet';
import { MinterButton } from '../common';
import headerLogo from './assets/logo.svg';
import headerIcon from './assets/icon.svg';

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
      <Box borderRadius="100%" width="5.5vh" height="5.5vh" bg="white">
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

function NavItems() {
  const system = useSelector(s => s.system);
  const dispatch = useDispatch();
  const [, setLocation] = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      {/* Mobile */}
      <Flex
      width="100%"
      bg="white"
      paddingX={10}
      paddingY={6}
      height="10vh"
        flex="1"
        justify="flex-end"
        display={{
          base: 'flex',
          md: 'none'
        }}
      >
        <Box
          color="brand.lightGray"
          ref={btnRef}
          cursor="pointer"
          onClick={onOpen}
          marginY="auto"
        >
          <HamburgerIcon size="30px"/>
        </Box>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="right"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody mt={12}>
                <Flex
                  flexDir="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Flex flexDir="column">
                    <MobileHeaderLink to="/marketplace" onClick={onClose}>
                      Marketplace
                    </MobileHeaderLink>
                    <MobileHeaderLink to="/about" onClick={onClose}>
                      FAQ
                    </MobileHeaderLink>
                    <MobileHeaderLink to="/collections" onClick={onClose}>
                      Collections
                    </MobileHeaderLink>
                    {system.status === 'WalletConnected' ? (
                      <MobileHeaderLink to="/create" onClick={onClose}>
                        New Asset
                      </MobileHeaderLink>
                    ) : null}
                  <Flex flexDir="row" m="2vh" align="center">
                    <Link href="https://github.com/BazaarMarket/Bazaar-Market" isExternal pl="20px" pr="20px" mt="14px" stroke="200">
                      <GitHub size="30px" strokeWidth="2.5px"/>
                    </Link>
                    <Link href="https://discord.gg/mnYZwv8s5a" isExternal pl="20px" pr="20px" mt="14px">
                      <RiDiscordLine size="40px"/>
                    </Link>  
                    <Link href="https://twitter.com/BazaarNfts" isExternal pl="20px" pr="20px" mt="14px">
                      <RiTwitterLine size="37px"/>
                    </Link> 
                  </Flex>
                  </Flex>
                  {system.status === 'WalletConnected' ? (
                    <MinterButton
                      variant="cancelAction"
                      onClick={async () => {
                        await dispatch(disconnectWallet());
                        setLocation('/');
                      }}
                      mb={10}
                    >
                      Disconnect Wallet
                    </MinterButton>
                  ) : (
                    <MinterButton
                      variant="secondaryAction"
                      onClick={e => {
                        e.preventDefault();
                        dispatch(connectWallet());
                      }}
                      mb={4}
                    >
                      Connect Wallet
                    </MinterButton>
                  )}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      {/* Desktop */}
      <Flex
      width="100%"
      bg="white"
      paddingX={10}
      paddingY={6}
      height="10vh"
      display={{
        base: 'none',
        md: 'flex'
      }}
    >
      <Flex width="100%">
        
        <Spacer />
        
        <DesktopHeaderLink to="/marketplace">
          <Text m={2}>Marketplace</Text>
        </DesktopHeaderLink>
        
        <DesktopHeaderLink to="/drops">
          <Text m={2}>Drops</Text>
        </DesktopHeaderLink>

        <DesktopHeaderLink to="/about">
          <Text m={2}>FAQ</Text>
        </DesktopHeaderLink>

        <Link href="https://discord.gg/mnYZwv8s5a" isExternal margin="auto" pl="13px" pr="15px">
          <RiDiscordLine size="27px"/>
        </Link>  
        
        <Link href="https://github.com/BazaarMarket/Bazaar-Market" isExternal margin="auto" pl="15px" pr="20px" size="30px" stroke="100">
          <GitHub/>
        </Link>
      
      </Flex>
      
      <Flex flex="1" alignSelf="right" color="brand.blue">
        <WalletDisplay />
      </Flex>
    
    </Flex>
    </>
  );
}

export function Header() {
  const [, setLocation] = useLocation();

  return (
    <Flex
      width="97%"
      maxW="100vw"
      bg="brand.white"
      height="10vh"
      marginLeft="2.5vw"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image
        display={{
          base: 'none',
          md: 'block'
        }}
        height="5vh"
        maxW="220px"
        src={headerLogo}
        onClick={e => {
          e.preventDefault();
          setLocation('/');
        }}
        cursor="pointer"
      />
      <Image
        display={{
          base: 'block',
          md: 'none'
        }}
        marginLeft="10px"
        marginTop="1vh"
        marginBottom="1vh"
        height="8vh"
        width="45px"
        src={headerIcon}
        onClick={e => {
          e.preventDefault();
          setLocation('/');
        }}
        cursor="pointer"
        align="right"
      />
      <NavItems/>
    </Flex>
  );
}

export default Header;

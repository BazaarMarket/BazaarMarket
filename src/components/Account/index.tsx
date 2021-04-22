import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Box,
  Flex, 
  Text, 
  Heading, 
  Image, 
  Link,
  Menu,
  MenuItem, 
  MenuButton,
  MenuList,
  Spacer 
} from '@chakra-ui/react';
import { ChevronDown, Package, Plus, GitHub, ExternalLink } from 'react-feather';
import { MinterButton /* , MinterLink */ } from '../common';
import logo from '../../components/common/assets/logo.svg';
import { connectWallet } from '../../reducer/async/wallet';
import { disconnectWallet } from '../../reducer/async/wallet';
import { useSelector, useDispatch } from '../../reducer';

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
    <Flex width="100%" align="center" float="left" flexDir="column">
      <Box borderRadius="100%" width="200px" height="200px" bg="white" align="center" boxShadow="2px 2px 4px rgba(0, 0, 0, .3);">
        <Image borderRadius="100%" width="100%"
          src={`https://services.tzkt.io/v1/avatars2/${props.tzPublicKey}`}
        />
      </Box>
      <Text pt="25px" fontWeight="bold">
        {props.tzPublicKey}
      </Text>
    </Flex>
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
            variant="secondaryActionLined"
            
            onClick={e => {
              e.preventDefault();
              dispatch(connectWallet());
            }}
          >
            <Text m={2} fontWeight="bold">Login</Text>
          </MinterButton>
      </Link>
    </>
    );
  }
  return (
    <>
      <WalletInfo tzPublicKey={system.tzPublicKey} />
    </>
  );
}

export function AccountPage() {
  const [location, setLocation] = useLocation();  
  return (
    <Flex minHeight="90vh" pt="25vh">
      <WalletDisplay /> 
    </Flex>
  );
}

export default AccountPage;
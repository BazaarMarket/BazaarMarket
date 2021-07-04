import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  useDisclosure
} from '@chakra-ui/react';
import { Plus } from 'react-feather';
import { MinterButton } from '../../common/index';
import { useDispatch } from '../../../reducer';
import { transferTokenAction } from '../../../reducer/async/actions';
import FormModal, { BaseModalProps, BaseModalButtonProps } from './FormModal';

interface TransferTokenModalProps extends BaseModalProps {
  contractAddress: string;
  tokenId: number;
}

export function TransferTokenModal(props: TransferTokenModalProps) {
  const [toAddress, setToAddress] = useState('');
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  return (
    <FormModal
      disclosure={props.disclosure}
      sync={props.sync}
      method="transferToken"
      dispatchThunk={() =>
        dispatch(
          transferTokenAction({
            contract: props.contractAddress,
            tokenId: props.tokenId,
            to: toAddress
          })
        )
      }
      onComplete={() => setToAddress('')}
      initialRef={initialRef}
      pendingMessage="Transferring token..."
      completeMessage="Transfer complete"
      body={onSubmit => (
        <>
          <ModalHeader>Transfer Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontFamily="mono">To Address</FormLabel>
              <Input
                autoFocus={true}
                ref={initialRef}
                placeholder="Input token recipient"
                value={toAddress}
                onChange={e => setToAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <MinterButton variant="primaryAction" onClick={() => onSubmit()}>
              Transfer
            </MinterButton>
          </ModalFooter>
        </>
      )}
    />
  );
}

interface BurnTokenModalProps extends BaseModalProps {
  contractAddress: string;
  tokenId: number;
}

export function BurnTokenModal(props: BurnTokenModalProps) {
  const toAddress = "tz1burnburnburnburnburnburnburjAYjjX";
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  return (
    <FormModal
      disclosure={props.disclosure}
      sync={props.sync}
      method="transferToken"
      dispatchThunk={() =>
        dispatch(
          transferTokenAction({
            contract: props.contractAddress,
            tokenId: props.tokenId,
            to: toAddress
          })
        )
      }
      initialRef={initialRef}
      pendingMessage="Burning token..."
      completeMessage="Burn complete"
      body={onSubmit => (
        <>
          <ModalHeader>Burn Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignContent="center" align="center">
            <Text fontStyle="italic">
              Are you sure you want to burn this NFT?
            </Text>
            <Text fontWeight="bold" color="brand.red">
              This action cannot be undone.
            </Text>
          </ModalBody>

          <ModalFooter alignSelf="center">
            <Flex width="100%" mb={3}>
              <MinterButton 
                variant="primaryAction" 
                width="150px" 
                backgroundColor="brand.red" 
                fontSize="20px" 
                onClick={() => onSubmit()}
              >
                Burn
              </MinterButton>
            </Flex>
          </ModalFooter>
        </>
      )}
    />
  );
}

interface TransferTokenButtonProps extends BaseModalButtonProps {
  contractAddress: string;
  tokenId: number;
}

export function TransferTokenButton(props: TransferTokenButtonProps) {
  const disclosure = useDisclosure();
  return (
    <>
      <MinterButton variant="primaryAction" onClick={disclosure.onOpen}>
        <Box color="currentcolor">
          <Plus size={16} strokeWidth="3" />
        </Box>
        <Text ml={2}>Transfer Token</Text>
      </MinterButton>
      <TransferTokenModal
        {...props}
        disclosure={disclosure}
        sync={props.sync}
      />
    </>
  );
}

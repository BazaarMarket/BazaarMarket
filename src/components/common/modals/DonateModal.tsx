import React, { useState } from 'react';
import {
  Box,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure, 
  FormControl,
  FormLabel,
  Input,
  Flex,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react';
import { MinterButton } from '..';
import { useDispatch, useSelector } from '../../../reducer';
import { donateTezAction } from '../../../reducer/async/actions';
import FormModal, { BaseModalProps, BaseModalButtonProps } from './FormModal';
import tz from '../assets/tezos-sym.svg'
import { FaDonate } from 'react-icons/fa';

interface DonateTezModalProps extends BaseModalProps {
  artistAddress: string;
  artistName: string;
}

export function DonateTezModal(props: DonateTezModalProps) {
  const [donationAmount, setDonationAmount] = useState(0);
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  return (
    <FormModal
      disclosure={props.disclosure}
      sync={props.sync}
      method="donateTez"
      dispatchThunk={() =>
        dispatch(
          donateTezAction({
            donationAmount: donationAmount,
            artistAddress: props.artistAddress
          })
        )
      }
      initialRef={initialRef}
      pendingMessage="Purchasing token..."
      completeMessage="Token purchased"
      body={onSubmit => (
        <>
          <ModalHeader>Tip Jar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2} fontWeight="bold" fontStyle="italic">
              Thanks for tipping {props.artistName}!
            </Text>
            <FormControl>
              <FormLabel fontFamily="mono">Tip Amount:</FormLabel>
              <InputGroup>
                <Input
                  autoFocus={true}
                  ref={initialRef}
                  placeholder="Input tip amount"
                  value={donationAmount}
                  onChange={e => setDonationAmount(Number(e.target.value))}
                />
                <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="ꜩ"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <MinterButton variant="primaryAction" onClick={() => onSubmit()}>
              Send Tip
            </MinterButton>
          </ModalFooter>
        </>
      )}
    />
  );
}

interface DonateTezModalButtonProps extends BaseModalButtonProps {
  artistAddress: string;
  artistName: string;
}

export function DonateTezButton(props: DonateTezModalButtonProps) {
  const disclosure = useDisclosure();
  const { status } = useSelector(s => s.status.donateTez)

  return (
    <>
      <MinterButton variant="primaryAction" backgroundColor="brand.green" onClick={disclosure.onOpen} disabled={status === 'in_transit'}>
      <Flex py={5}>
        <FaDonate color="white" size="3vh"/>
        <Text fontSize="1.25em" fontWeight="bold" ml={3}>Tip Jar</Text>
      </Flex>
      </MinterButton>

      <DonateTezModal {...props} disclosure={disclosure} artistAddress={props.artistAddress} artistName={props.artistName} sync={props.sync} />
    </>
  );
}
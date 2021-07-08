import React from "react";

import { 
  Accordion, 
  AccordionButton, 
  AccordionIcon, 
  AccordionItem, 
  AccordionPanel, 
  Badge,
  Box, 
  Button,
  Flex, 
  Heading,
  FormControl, 
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  Input, 
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  SimpleGrid,
  SimpleGridProps,
  Link, 
  Image,
} from '@chakra-ui/react';

import { Phone, User, Mail} from 'react-feather';

import CodeCrafting from '../common/assets/CodeCrafting.png';
import GregoryRocco from '../common/assets/GregoryRocco.png';
import Sebuh from '../common/assets/Sebuh.png';
import Manticor from '../common/assets/Manticor.png';
import Primate from '../common/assets/Primate.png';
import Blangs from '../common/assets/Blangs.png';
import David_99 from '../common/assets/David_99.png';
import BlankProfile from '../common/assets/BlankProfile.png';

import TQTezos from '../common/assets/TQTezos.png';
import Homebase from '../common/assets/Homebase.svg';
import Taquito from '../common/assets/Taquito.png';
import Beacon from '../common/assets/Beacon.png';
import Crunchy from '../common/assets/Crunchy.png';
import OpenMinter from '../common/assets/OpenMinter.svg';
import Spruce from '../common/assets/Spruce.png';
import Rocket from '../common/assets/Rocket.png';
import Wert from '../common/assets/Wert.png';
import TzProfiles from '../common/assets/TzProfiles.png';

import {
  Formik,
  Form,
  Field,
} from 'formik';

import { Chrono } from "react-chrono-plus";
import data from "./data";

const encode = (data: string) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[+key]))
    .join("&");
}

function ContactForm() {
  let Values= { 
    "name": "",
    "email": "",
    "message": "" 
  }

  function validateName(values: typeof Values) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      let error = '';
      if(!values.name) {
        error = 'Name Required'
      }
      if(!values.email || !emailRegex.test(values.email)) {
        error = 'Valid Email Required'
      }
      if(!values.message) {
        error = 'Message Required'
      }
      return error;
  }

  return (
    <Flex borderWidth="1px" borderRadius="25px" px={8} py={5}>
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      onSubmit={(values, actions) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact-demo", ...values }.toString())
          })
          .then(() => {
            alert('Success');
            actions.resetForm()
          })
          .catch(() => {
            alert('Error');
          })
          .finally(() => actions.setSubmitting(false))
        }
      }
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {() => (
              <FormControl>
                <form name="contact" data-netlify="true" netlify-honeypot="bot-field">
                  <Flex flexDir="column">
                    <Heading>Want to get in touch?</Heading>
                    <Heading size="md" mt={2}>Contact us here!</Heading>
                    <Flex flexDir="row" my={4}>
                    <InputGroup pr={3}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<User color="gray" />}
                      />
                      <Input {...Field} id="name" placeholder="Name" />
                      <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Mail color="gray" />}
                      />
                      <Input {...Field} id="email" placeholder="Email" />
                      <FormErrorMessage>{props.errors.email}</FormErrorMessage>
                    
                    </InputGroup>
                    </Flex>
                    <Input {...Field} id="message" placeholder="Message" />
                    <FormErrorMessage>{props.errors.message}</FormErrorMessage>
                  </Flex>
                </form>
              </FormControl>
            )}
          </Field>
          <Flex flexDir="column">
          <Button
            my={4}
            colorScheme="blue"
            width="125px"
            type="submit"
            isLoading
            loadingText="Loading"
          >
            Submit
          </Button>
          <Badge colorScheme="yellow" textAlign="center">This form is under construction</Badge>
          <Text color="brand.blue" pt={4} textAlign="center">
            Please contact us via <Link fontWeight="bold" href="https://forms.gle/LhFk3yXt9EZN59tCA">this Google Form.</Link>
          </Text>
          </Flex>
          
          
        </Form>
      )}
    </Formik>
    </Flex>
  );
}

interface PartnerProfileProps {
  name: string | null;
  company: string | null;
  src: string | undefined;
}

function PartnerProfile({
  name,
  company,
  src,
}: PartnerProfileProps) {
  return(
    <Flex flexDir="column" align="center">
      <Flex width="10vw" height="10vw" bg="brand.blue" borderRadius="100px">
          <Image src={src} borderRadius="100%"/>
      </Flex>
      <Text mt={4} fontWeight="bold">
       {name}
      </Text>
      <Text fontSize="0.75em" fontStyle="italic">
        {company}
      </Text>
    </Flex>
  );
}

interface PartnerLogoProps {
  company: string | null;
  width: string | undefined;
  src: string | undefined;
}

function PartnerLogo({
  company,
  width,
  src,
}: PartnerLogoProps) {
  return(
    <Flex flexDir="column" align="center">
      <Flex width={width} height="auto" align="center">
          <Image src={src} width={width} align="center"/>
      </Flex>
      <Text mt={4} fontWeight="bold"  textAlign="center">
       {company}
      </Text>
    </Flex>
  );
}

export default function AboutPage() {
  return (
    <Flex
      align="center"
      justifyContent="space-between"
      w="100%"
      flex="1"
      flexDir="column"
      bg="#ffffff"
      mt={10}
    >
      
      <Flex flexDir="row" align="center" height="55vh" justify="space-evenly">
        <Flex flexDir='column' justify="space-between">
          <Heading mb={5}>
            What is Bazaar?
          </Heading>
          <Flex flexDir="column" width="30vw">
            <Heading size="md" mb={5}>
              Bazaar Market is the first ever carbon-negative NFT market, powered by&nbsp;
              <Link href="https://tezos.com" color="brand.blue">Tezos</Link>.
            </Heading>
            <Text mb={5}>
              We support creators, collectors, and crypto-enthusiasts by providing 
              a user-friendly, carbon-offset NFT market experience. 
            </Text>
            <Text>
              If you'd like to learn more about us, keep scrolling, and please contact
              us using this form if you have any questions!
            </Text>
          </Flex>
        </Flex>
        <Spacer width="10vw"/>
        <ContactForm/>
      </Flex>
      <Flex flexDir="column" align="center" width="100%" my="8vh">
        <Heading mb={10}>
            Who are we?
        </Heading>
          <Flex flexDir="column" width="60vw" align="center">
            <Heading size="md" mb={5} textAlign="center">
              Bazaar Market was started by Geoff McIntyre, but has grown into much more.
            </Heading>
            <Text mb={5} textAlign="center">
              Although Geoff maintains the website and social media, we have an ever growing following on Twitter, 
              and hundreds of artists, creators, and collectors participating in our ecosystem. Bazaar values the 
              ideas of The Community, which is why we started bDAO, a decentralized governance token. bDAO allows 
              our Bazaar Community to have a say in what happens on the website and at large.
            </Text>
            <Link href="http://docs.bazaarnft.xyz/bdao" color="brand.blue">
              <Text mb={5}>
                Learn more about decentralized governance in our Docs → 
              </Text>
            </Link>
            <Text textAlign="center" fontStyle="italic" fontWeight="bold" width="40vw">
              Bazaar is currently looking for full-time development help. Please contact us if you have skills 
              developing smart contracts and/or working with React (TypeScript)
            </Text>
        </Flex>
      </Flex>
      <Flex width="85%" flexDir="column" alignSelf="center" align="center">
        <Heading mb={10}>Our Roadmap</Heading>
        <Chrono 
          mode="VERTICAL_ALTERNATING"
          cardHeight={200}
          scrollable
          items={data} 
          theme={{ primary:'#4AA0D5', secondary: '#D3DEF5'}}
          hideControls
        />
        <Link href="http://docs.bazaarnft.xyz" mt={5}>
          <Text color="brand.blue">Exhaustive Roadmap →</Text>
        </Link>
      </Flex>
      <Flex flexDir="column" my="10vh" align="center">
          <Heading textAlign="center" mb={10}>
            Our Partners
          </Heading>
          <Text textAlign="center" fontStyle="italic" fontWeight="bold" width="40vw" mb={10}>
              Bazaar couldn't be possible without our amazing network of partners. 
              This an extensive (but not comprehensive) list of people and projects
              that have allowed Bazaar to exist.
          </Text>
          <Heading size="md" mb={10}>
            To all our Partners, Thank you.
          </Heading>
          <Heading size="lg" my={10}>
            Humans:
          </Heading>
          <SimpleGrid columns={{sm: 2, md: 3, lg: 3, xl: 3}} gap="3vw" pb={8}>
            <PartnerProfile name="Sebuh Honarchian" company="Sebuh.net" src={Sebuh}/>
            <PartnerProfile name="Josh Dechant || CodeCrafting" company="Crunchy | TQTezos" src={CodeCrafting}/>
            <PartnerProfile name="Gregory Rocco" company="Spruce | TQTezos" src={GregoryRocco}/>
            <PartnerProfile name="Vianney" company="Kumulus" src={BlankProfile}/>
            <PartnerProfile name="Manticor" company="TezTools" src={Manticor}/>
            <PartnerProfile name="Emil 'Primate' Swenson" company="BakingBenjamins" src={Primate}/>
          </SimpleGrid>
          <Heading size="lg" my={10}>
            Software:
          </Heading>
          <SimpleGrid align="center" columns={{sm: 2, md: 3, lg: 3, xl: 3}} gap="3vw" pb={8}>
            <PartnerLogo width="17vw" company="" src={TQTezos}/>
            <PartnerLogo width="15vw" company="" src={Spruce}/>
            <PartnerLogo width="15vw" company="" src={Beacon}/>
            <PartnerLogo width="10vw" company="" src={Crunchy}/>
            <PartnerLogo width="10vw" company="" src={Rocket}/>
            <PartnerLogo width="10vw" company="" src={Wert}/>
            <PartnerLogo width="12vw" company="" src={OpenMinter}/>
            <PartnerLogo width="10vw" company="" src={Taquito}/>
            <PartnerLogo width="13vw" company="" src={Homebase}/>
          </SimpleGrid>
      </Flex>
    </Flex>
  );
}
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
  Link, 
} from '@chakra-ui/react';

import { Phone, User, Mail} from 'react-feather';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage
} from 'formik';

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
          <Badge colorScheme="yellow" textAlign="center">This form is under construction.</Badge>
          <Text color="brand.blue" pt={4} textAlign="center">
            Please contact us via email: BazaarNFT@gmail.com
          </Text>
          </Flex>
          
          
        </Form>
      )}
    </Formik>
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
    >
      
      <Flex mt="10%" flexDir="row" align="center" pt={20} height="90vh" justify="space-evenly">
        <Flex flexDir='column'>
          <Heading>
            Our Mission
          </Heading>
          <Text>
            More info coming soon.
          </Text>
          <Heading>
            Our Roadmap
          </Heading>
          <Text>
            More info coming soon.
          </Text>
          <Heading>
            Our Partners
          </Heading>
          <Text>
            More info coming soon.
          </Text>
        </Flex>
        <Spacer width="10vw"/>
        <ContactForm/>
      </Flex>
    </Flex>
  );
}
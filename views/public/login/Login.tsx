import React, { useState } from "react";
import {
  Flex,
  Card,
  Link,
  Text,
  Image,
  Input,
  VStack,
  Button,
  Heading,
  Checkbox,
  FormLabel,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <Container maxW="full" bg="background.secondary" p="0" h="100vh">
      <Container
        px="0"
        maxW="full"
        display="flex"
        borderRadius="md"
        justifyContent="space-between"
      >
        <VStack
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Card
            bg="background.primary"
            p="5"
            w={{ base: "100%", sm: "96" }}
            margin="auto"
            shadow="xl"
            textAlign="center"
          >
            <VStack spacing="5">
              <Heading as="h1" fontSize="2xl">
                Bienvenido a Facultil
              </Heading>
              <Button>Continuar con Google</Button>
            </VStack>
          </Card>
          <Flex />
        </VStack>
      </Container>
    </Container>
  );
}

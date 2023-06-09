import React from "react";
import { Flex, Card, Text, VStack, Heading, Container } from "@chakra-ui/react";
import GoogleButton from "./components/GoogleButton";

export default function Login() {
  return (
    <Container maxW="full" bg="background.secondary" p="0">
      <Container
        px="0"
        h="100vh"
        maxW="full"
        display="flex"
        borderRadius="md"
        justifyContent="center"
      >
        <VStack
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Card
            py="12"
            shadow="xl"
            margin="auto"
            textAlign="center"
            bg="background.primary"
            w={{ base: "100%", sm: "96" }}
          >
            <VStack spacing="5">
              <Heading as="h1" fontSize="2xl">
                BIENVENIDO A FACULTIL
              </Heading>
              <Text fontWeight="600" pb="5">
                Inicia sesión en tu cuenta
              </Text>
              <GoogleButton />
            </VStack>
          </Card>
          <Flex />
        </VStack>
      </Container>
    </Container>
  );
}

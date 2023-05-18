import React from "react";
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
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";

export default function Subjects() {
  return (
    <Container maxW="full" bg="background.secondary" p="0" h="100vh">
      <Container
        px="0"
        maxW="full"
        display="flex"
        borderRadius="md"
        justifyContent="space-between"
      >
        <Text>New Route</Text>
        <BottomNavbar />
      </Container>
    </Container>
  );
}

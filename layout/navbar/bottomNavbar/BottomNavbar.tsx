import React from "react";
import {
  Flex,
  Card,
  Link,
  Text,
  Input,
  VStack,
  Button,
  Heading,
  Checkbox,
  FormLabel,
  Container,
  FormControl,
} from "@chakra-ui/react";
import BlackBooks from "assets/images/navbar/BlackBooks.png";
import PrimaryBooks from "assets/images/navbar/PrimaryBooks.png";
import Image from "next/image";
import BlackCalendar from "assets/images/navbar/BlackCalendar.png";
import { useRouter } from "next/router";

export default function BottomNavbar() {
  const { asPath } = useRouter();

  console.log(asPath);
  return (
    <Container
      maxW="full"
      bg="background.primary"
      //   bg="red"
      p="0"
      display="flex"
      position="absolute"
      bottom="0"
      shadow="brand_shadow_lg"
    >
      <Container
        py="2"
        maxW="full"
        display="flex"
        borderRadius="md"
        justifyContent="space-evenly"
      >
        <VStack>
          <Image
            src={
              asPath === "/student/subjects" ? PrimaryBooks.src : BlackBooks.src
            }
            width="40"
            height="40"
            alt="Materias"
          />
          <Text fontSize="sm" fontWeight="600">
            Materias
          </Text>
        </VStack>
        <VStack>
          <Image
            src={BlackCalendar.src}
            width="40"
            height="40"
            alt="calendario"
          />
          <Text fontSize="sm" fontWeight="600">
            Calendario
          </Text>
        </VStack>
      </Container>
    </Container>
  );
}

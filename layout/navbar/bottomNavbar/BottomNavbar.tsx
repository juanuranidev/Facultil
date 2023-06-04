import { Container, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import RedNavbarBook from "assets/icons/navbar/RedNavbarBook.png";
import WhiteNavbarBook from "assets/icons/navbar/WhiteNavbarBook.png";
import RedNavbarCalendar from "assets/icons/navbar/RedNavbarCalendar.png";
import WhiteNavbarCalendar from "assets/icons/navbar/WhiteNavbarCalendar.png";

export default function BottomNavbar() {
  const { asPath } = useRouter();

  const isSubjectsView = asPath === "/student/subjects";
  const isCalendarView = asPath === "/student/calendar";

  return (
    <Container
      maxW="full"
      bg="background.primary"
      p="0"
      display="flex"
      position="fixed"
      bottom="0"
      left="0"
      shadow="rgba(17, 17, 26, 0.1) 0px 0px 16px;"
    >
      <Container
        p="0"
        maxW="full"
        display="flex"
        alignItems="center"
        borderRadius="md"
      >
        <VStack spacing="1" w="50%" h="4rem" justifyContent="center">
          <motion.div
            style={{ width: "100%" }}
            transition={{ delay: 0.25 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: "-5%" }}
          >
            <Link
              w="100%"
              // paddingY="2"
              display="flex"
              alignItems="center"
              h="4rem"
              justifyContent="center"
              flexDirection="column"
              href="/student/subjects"
            >
              <Image
                src={isSubjectsView ? RedNavbarBook.src : WhiteNavbarBook.src}
                width="25"
                height="25"
                alt="Materias"
              />
              <Text
                fontSize="xs"
                fontWeight="600"
                color={isSubjectsView ? "text.secondary" : "text.tertiary"}
              >
                Materias
              </Text>
            </Link>
          </motion.div>
        </VStack>
        <VStack spacing="1" w="50%" h="4rem" justifyContent="center">
          <motion.div
            style={{ width: "100%" }}
            transition={{ delay: 0.25 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: "-5%" }}
          >
            <Link
              w="100%"
              // paddingY="2"
              h="4rem"
              justifyContent="center"
              display="flex"
              alignItems="center"
              flexDirection="column"
              href="/student/calendar"
            >
              <Image
                src={isCalendarView ? RedNavbarCalendar : WhiteNavbarCalendar}
                width="25"
                height="25"
                alt="calendario"
              />
              <Text
                fontSize="xs"
                fontWeight="600"
                color={isCalendarView ? "text.secondary" : "text.tertiary"}
              >
                Calendario
              </Text>
            </Link>
          </motion.div>
        </VStack>
      </Container>
    </Container>
  );
}

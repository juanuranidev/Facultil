import React from "react";
import { motion } from "framer-motion";
import { GradeModel } from "models/client/grade.model";
import {
  Card,
  Heading,
  Image,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import DotsMenu from "assets/icons/subjects/SubjectMenu.png";
import Link from "next/link";

interface GradeProps {
  index: number;
  grade: GradeModel;
  onDelete: (Grade: GradeModel) => void;
}

export default function Grade({ index, grade, onDelete }: GradeProps) {
  return (
    <motion.div
      style={{ marginBottom: "2rem" }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-5%" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        p="2"
        my="5"
        w="100%"
        shadow="md"
        margin="auto"
        as={motion.div}
        display="flex"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex w="90%" alignItems="center">
            <Text
              fontSize="xl"
              w="15%"
              textAlign="center"
              mr="2"
              fontWeight="600"
            >
              {grade?.grade}
            </Text>
            <VStack alignItems="flex-start" spacing="0">
              <Text fontSize="lg">{grade?.description}</Text>
              <Text fontSize="xs" opacity="0.5">
                {grade?.date}
              </Text>
            </VStack>
          </Flex>
          <Flex w="10%" alignItems="center" justifyContent="flex-end" h="100%">
            <Menu>
              <MenuButton>
                <Image src={DotsMenu.src} w="8" h="100%" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => onDelete(grade)}>Eliminar</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { SubjectModel } from "models/client/subject.model";
import {
  Card,
  Heading,
  Image,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import DotsMenu from "assets/icons/subjects/SubjectMenu.png";
import Link from "next/link";

interface SubjectProps {
  index: number;
  subject: SubjectModel;
  onDelete: (subject: SubjectModel) => void;
}

export default function Subject({ index, subject, onDelete }: SubjectProps) {
  return (
    <motion.div
      style={{ marginTop: "2rem" }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-5%" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        my="5"
        w="90%"
        shadow="md"
        margin="auto"
        as={motion.div}
        display="flex"
      >
        <Flex justifyContent="space-between">
          <Link
            href={`/student/subject/${subject._id}`}
            style={{
              width: "100%",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Heading marginLeft="2" fontSize="lg">
                {subject.name}
              </Heading>
              <Flex alignItems="center">
                <Image src={subject.image} />
              </Flex>
            </Flex>
          </Link>
          <Menu>
            <MenuButton>
              <Image src={DotsMenu.src} w="8" h="8" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onDelete(subject)}>Eliminar</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Card>
    </motion.div>
  );
}

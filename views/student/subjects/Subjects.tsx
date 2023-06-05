import React, { useContext, useState, useEffect } from "react";
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
  Menu,
  Checkbox,
  MenuItem,
  FormLabel,
  Container,
  FormControl,
  Avatar,
  HStack,
  MenuButton,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";
import { signOut } from "next-auth/react";
import { UserContext } from "context/UserContext";
import { SubjectModel } from "models/client/subject.model";
import {
  handleDeleteSubjectService,
  handleGetSubjectsService,
  handlePostSubjectService,
} from "services/client/subject/subject.services";
import SubjectsList from "components/subjectsList/SubjectsList";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";
import ModalAddSubject from "components/modals/modalAddSubject/ModalAddSubject";
import Header from "layout/header/Header";

export default function Subjects() {
  const toast = useToast();
  const { user } = useContext(UserContext);

  const [subjects, setSubjects] = useState<SubjectModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAddSubject, setModalAddSubject] = useState(false);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [subjectSelected, setSubjectSelected] = useState<
    SubjectModel | undefined
  >(undefined);

  const handleAddSubject = async (subject: SubjectModel) => {
    setIsLoading(true);
    try {
      const response: any = await handlePostSubjectService(user._id, subject);
      console.log(response);

      await handleGetSubjects();
      setIsLoading(false);
      setModalAddSubject(false);
      toast({
        isClosable: true,
        status: "success",
        position: "bottom-right",
        title: response.data.message,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const handleGetSubjects = async () => {
    setIsLoading(true);
    try {
      const response: any = await handleGetSubjectsService(user._id);
      setSubjects(response.data.data);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const handleDeleteSubject = async () => {
    setIsLoading(true);
    try {
      const response: any = await handleDeleteSubjectService(
        user._id,
        subjectSelected?._id
      );
      await handleGetSubjects();
      setModalConfirm(false);
      setIsLoading(false);

      toast({
        isClosable: true,
        status: "success",
        position: "bottom-right",
        title: response.data.message,
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.data.message,
      });
    }
  };

  const handleOpenModalConfirm = (subject: SubjectModel) => {
    setSubjectSelected(subject);
    setModalConfirm(true);
  };

  useEffect(() => {
    if (user) {
      handleGetSubjects();
    }
  }, [user]);

  return (
    <Container
      maxW="full"
      bg="background.secondary"
      p="0"
      h="calc(100vh - 4rem)"
      overflowY="scroll"
    >
      <Container
        px="0"
        maxW="container.xl"
        display="flex"
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Header />
        {subjects?.length ? (
          <SubjectsList subjects={subjects} onDelete={handleOpenModalConfirm} />
        ) : (
          <Flex w="100%" justifyContent="center">
            <Text fontSize="lg" fontWeight="600">
              ¡Agrega materias!
            </Text>
          </Flex>
        )}
        <Button my="2rem" mx="5" onClick={() => setModalAddSubject(true)}>
          Nueva Materia
        </Button>

        <BottomNavbar />
      </Container>
      {modalAddSubject ? (
        <ModalAddSubject
          isLoading={isLoading}
          isOpen={modalAddSubject}
          onClose={() => setModalAddSubject(false)}
          onSubmit={handleAddSubject}
        />
      ) : null}
      {modalConfirm ? (
        <ModalConfirm
          isLoading={isLoading}
          isOpen={modalConfirm}
          onClose={() => setModalConfirm(false)}
          onSubmit={handleDeleteSubject}
          body={`¿Deseas eliminar la materia ${subjectSelected?.name}?`}
        />
      ) : null}
    </Container>
  );
}

import React, { useContext, useEffect, useState } from "react";
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
  CircularProgress,
  Skeleton,
} from "@chakra-ui/react";
import {
  handleDeleteGradeService,
  handleGetGradesService,
  handlePostGradeService,
} from "services/client/grade.services";
import { handleGetSubjectByIdService } from "services/client/subject.services";
import { SubjectModel } from "models/client/subject.model";
import { UserContext } from "context/UserContext";
import { GradeModel } from "models/client/grade.model";
import { useRouter } from "next/router";
import ModalAddGrade from "components/modals/modalAddGrade/ModalAddGrade";
import BottomNavbar from "layout/navbar/bottomNavbar/BottomNavbar";
import GradeList from "components/gradesList/GradeList";
import Header from "layout/header/Header";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";

export default function Subject() {
  const toast = useToast();
  const router = useRouter();

  const { id } = router.query;
  const { user } = useContext(UserContext);

  const [grades, setGrades] = useState([]);
  const [subject, setSubject] = useState<SubjectModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [gradeSelected, setGradeSelected] = useState<GradeModel | null>(null);
  const [modalAddGrade, setModalAddGrade] = useState<boolean>(false);

  const handleGetSubject = async () => {
    try {
      const response: any = await handleGetSubjectByIdService(user._id, id!);
      setSubject(response.data.data[0]);
    } catch (error: any) {
      console.log(error);
      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.data.message,
      });
    }
  };

  const handlePostGrade = async (grade: GradeModel) => {
    setIsLoading(true);
    try {
      const response: any = await handlePostGradeService(user._id, grade);

      setIsLoading(false);
      setModalAddGrade(false);
      await handleGetGrades();

      toast({
        isClosable: true,
        status: "success",
        position: "bottom-right",
        title: response.data.message,
      });
    } catch (error: any) {
      console.log(error.response);
      setIsLoading(false);
      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error?.response?.data?.message,
      });
    }
  };

  const handleGetGrades = async () => {
    try {
      const response: any = await handleGetGradesService(user._id);
      setGrades(response.data.data);
    } catch (error: any) {
      console.log(error);
      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.data.message,
      });
    }
  };

  const handleDeleteGrade = async () => {
    setIsLoading(true);
    try {
      const response: any = await handleDeleteGradeService(
        user._id,
        gradeSelected?._id!
      );
      console.log(response);

      setIsLoading(false);
      await handleGetGrades();
      handleCloseModalConfirm();

      toast({
        isClosable: true,
        status: "success",
        position: "bottom-right",
        title: response.data.message,
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast({
        isClosable: true,
        status: "error",
        position: "bottom-right",
        title: error.response.data.message,
      });
    }
  };

  const handleCloseModalConfirm = () => {
    setModalConfirm(false);
    setGradeSelected(null);
  };

  const handleOpenModalConfirm = (grade: GradeModel) => {
    setGradeSelected(grade);
    setModalConfirm(true);
  };

  useEffect(() => {
    if (user && id) {
      handleGetSubject();
      handleGetGrades();
    }
  }, [user, id]);

  return (
    <Container
      maxW="full"
      bg="background.secondary"
      p="0"
      h="calc(100vh - 4rem)"
      overflowY="scroll"
    >
      <Container
        px="5"
        maxW="container.xl"
        display="flex"
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Header />
        <BottomNavbar />

        {subject?.name ? (
          <Flex
            p="5"
            w="100%"
            shadow="md"
            borderRadius="lg"
            bg="background.primary"
            justifyContent="space-between"
          >
            <Heading as="h1">{subject?.name}</Heading>

            <Button onClick={() => router.back()}>Volver</Button>
          </Flex>
        ) : (
          <Skeleton shadow="md" w="100%" h="20" opacity="0.3" />
        )}

        <Flex flexDirection="column">
          <Heading as="h2" fontSize="lg" mb="5" mt="10">
            Calificaciones
          </Heading>
          <GradeList grades={grades} onDelete={handleOpenModalConfirm} />
          <Flex justifyContent="flex-end">
            <Button variant="link" onClick={() => setModalAddGrade(true)}>
              Nueva Calificación
            </Button>
          </Flex>
        </Flex>
      </Container>
      {modalAddGrade ? (
        <ModalAddGrade
          isOpen={modalAddGrade}
          onClose={() => setModalAddGrade(false)}
          onSubmit={(values) => handlePostGrade(values)}
          isLoading={isLoading}
        />
      ) : null}
      {modalConfirm ? (
        <ModalConfirm
          isOpen={modalConfirm}
          isLoading={isLoading}
          onClose={handleCloseModalConfirm}
          onSubmit={handleDeleteGrade}
          body={`¿Deseas eliminar la nota ${gradeSelected?.description}?`}
        />
      ) : null}
    </Container>
  );
}

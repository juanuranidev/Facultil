import React, { useState } from "react";
import {
  Box,
  Text,
  Modal,
  Input,
  Flex,
  Image,
  Alert,
  Select,
  HStack,
  Button,
  VStack,
  Avatar,
  Divider,
  FormLabel,
  AlertIcon,
  ModalBody,
  IconButton,
  AlertTitle,
  FormControl,
  ButtonGroup,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  AlertDescription,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  addSubjectSchema,
  iconsForSubjects,
} from "components/modals/modalAddSubject/Util";
import Calculator from "assets/icons/subjects/Calculator.png";
import BookWithPencil from "assets/icons/subjects/BookWithPencil.png";
import { UserModel } from "models/client/user.model";
import { SubjectModel } from "models/client/subject.model";

interface ModalAddSubjectProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ModalAddSubject({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
}: ModalAddSubjectProps) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        image: "",
        is_active: true,
      },
      onSubmit: (values: SubjectModel) => {
        onSubmit(values);
      },
      validationSchema: addSubjectSchema,
    });

  const subjectImageSelected = iconsForSubjects.find(
    (iconForSubject) => iconForSubject.image === values.image
  )?.image;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Agregar Nueva Materia</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <FormControl
              my="5"
              isInvalid={Boolean(touched.name && errors.name)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Nombre
                <Text
                  color={Boolean(errors.name && touched.name) ? "red" : "black"}
                  pl="1"
                >
                  *
                </Text>
              </FormLabel>
              <Input
                px="2"
                size="md"
                name="name"
                type="text"
                maxLength={25}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FormControl>
            <Flex w="100%" alignItems="flex-end" justifyContent="space-between">
              <Flex w={!values.image ? "100%" : "80%"}>
                <FormControl
                  alignItems="center"
                  isInvalid={Boolean(touched.image && errors.image)}
                >
                  <FormLabel width="100%" display="flex" alignItems="center">
                    Image
                    <Text
                      color={
                        Boolean(errors.image && touched.image) ? "red" : "black"
                      }
                      pl="1"
                    >
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    p="1"
                    name="image"
                    value={values.image}
                    onBlur={handleBlur}
                    size="md"
                    onChange={handleChange}
                    placeholder="Selecciona una imágen"
                  >
                    {iconsForSubjects.map(
                      (iconForSubject: any, index: number) => (
                        <option key={index} value={iconForSubject.image}>
                          {iconForSubject.name}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              </Flex>
              {values.image ? (
                <Flex w={"20%"} justifyContent="flex-end">
                  <Image src={subjectImageSelected!} />
                </Flex>
              ) : null}
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"flex-end"}>
            <Button
              mr="5"
              variant="cancel"
              colorScheme="red"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="confirm"
              isLoading={isLoading}
              //   disabled={!clients[objectSelected].planId}
            >
              Agregar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

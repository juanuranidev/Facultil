import {
  Text,
  Flex,
  Input,
  Modal,
  Button,
  Divider,
  FormLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormControl,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import { addGradeSchema } from "components/modals/modalAddGrade/Util";
import { GradeModel } from "models/client/grade.model";
import { useFormik } from "formik";

interface ModalAddGradeProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ModalAddGrade({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
}: ModalAddGradeProps) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        grade: "",
        description: "",
        date: "",
        is_active: true,
      },
      onSubmit: (values: GradeModel) => {
        onSubmit(values);
      },
      validationSchema: addGradeSchema,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Agregar Nueva Materia</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex justifyContent="space-between">
              <FormControl
                my="5"
                w="48%"
                isInvalid={Boolean(touched.grade && errors.grade)}
              >
                <FormLabel width="100%" display="flex" alignItems="center">
                  Nota
                  <Text
                    color={
                      Boolean(errors.grade && touched.grade) ? "red" : "black"
                    }
                    pl="1"
                  >
                    *
                  </Text>
                </FormLabel>
                <Input
                  px="2"
                  size="md"
                  name="grade"
                  type="text"
                  maxLength={3}
                  value={values.grade}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                my="5"
                w="48%"
                isInvalid={Boolean(touched.date && errors.date)}
              >
                <FormLabel width="100%" display="flex" alignItems="center">
                  Fecha
                  <Text
                    color={
                      Boolean(errors.date && touched.date) ? "red" : "black"
                    }
                    pl="1"
                  >
                    *
                  </Text>
                </FormLabel>
                <Input
                  px="2"
                  size="md"
                  name="date"
                  type="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
            <FormControl
              mb="5"
              isInvalid={Boolean(touched.description && errors.description)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Descripción
                <Text
                  color={
                    Boolean(errors.description && touched.description)
                      ? "red"
                      : "black"
                  }
                  pl="1"
                >
                  *
                </Text>
              </FormLabel>
              <Input
                px="2"
                size="md"
                maxLength={25}
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </FormControl>
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

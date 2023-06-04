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

import Calculator from "assets/icons/subjects/Calculator.png";
import BookWithPencil from "assets/icons/subjects/BookWithPencil.png";
import { UserModel } from "models/client/user.model";

interface ModalConfirmProps {
  body: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function ModalConfirm({
  body,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ModalConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Nueva Materia</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>{body}</ModalBody>
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
            onClick={onSubmit}
            variant="confirm"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

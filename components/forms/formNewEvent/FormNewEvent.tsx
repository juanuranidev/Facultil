import React, { useState } from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  Drawer,
  Select,
  Button,
  useToast,
  DrawerBody,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { addNewEventSchema } from "components/modals/modalCalendarEvents/Util";
import { EventModel } from "models/client/event.model";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import moment from "moment";
import { postEventService } from "services/client/event.services";
import { UserModel } from "models/client/user.model";

interface FormNewEventProps {
  dateSelected: any;
  user: UserModel;
  //   handleSubmit: any;
}

export default function FormNewEvent({
  dateSelected,
  user,
}: //   handleSubmit,
FormNewEventProps) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        time: "",
        title: "",
        date: dateSelected,
        is_active: true,
      },
      onSubmit: (values: EventModel) => {
        handlePostEvent(values);
      },
      validationSchema: addNewEventSchema,
    });

  const handlePostEvent = async (event: EventModel) => {
    setIsLoading(true);
    try {
      const response: any = await postEventService(user._id, event);

      setIsLoading(false);
      //   onClose();
      //   handleGetEvents(new Date(dateSelected).toISOString());

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
        title: error?.response?.data?.message,
      });
    }
  };

  return (
    <motion.div
      style={{
        width: "90%",
        margin: "auto",
        display: "flex",
        marginTop: "1.25rem",
        flexDirection: "column",
        marginBottom: "1.25rem",
      }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-5%" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Flex mb="5" alignItems="center">
        <Text mx="2" fontSize="md">
          Fecha:
        </Text>
        <Text m="0" fontSize="md" fontWeight="600">
          {moment(dateSelected).format("DD/MM/YYYY")}
        </Text>
      </Flex>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl mb="5" isInvalid={Boolean(touched.title && errors.title)}>
          <Input
            px="2"
            size="md"
            placeholder="Título"
            name="title"
            type="text"
            maxLength={50}
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb="5" isInvalid={Boolean(touched.time && errors.time)}>
          <Select
            size="md"
            name="time"
            value={values.time}
            onBlur={handleBlur}
            placeholder="Hora"
            onChange={handleChange}
          >
            <option value="00:00 a.m">00:00 a.m</option>
            <option value="01:00 a.m">01:00 a.m</option>
            <option value="02:00 a.m">02:00 a.m</option>
            <option value="03:00 a.m">03:00 a.m</option>
            <option value="04:00 a.m">04:00 a.m</option>
            <option value="05:00 a.m">05:00 a.m</option>
            <option value="06:00 a.m">06:00 a.m</option>
            <option value="07:00 a.m">07:00 a.m</option>
            <option value="08:00 a.m">08:00 a.m</option>
            <option value="09:00 a.m">09:00 a.m</option>
            <option value="10:00 a.m">10:00 a.m</option>
            <option value="11:00 a.m">11:00 a.m</option>
            <option value="12:00 p.m">12:00 p.m</option>
            <option value="13:00 p.m">13:00 p.m</option>
            <option value="14:00 p.m">14:00 p.m</option>
            <option value="15:00 p.m">15:00 p.m</option>
            <option value="16:00 p.m">16:00 p.m</option>
            <option value="17:00 p.m">17:00 p.m</option>
            <option value="18:00 p.m">18:00 p.m</option>
            <option value="19:00 p.m">19:00 p.m</option>
            <option value="20:00 p.m">20:00 p.m</option>
            <option value="21:00 p.m">21:00 p.m</option>
            <option value="22:00 p.m">22:00 p.m</option>
            <option value="23:00 p.m">23:00 p.m</option>
            <option value="24:00 a.m">24:00 a.m</option>
          </Select>
        </FormControl>
      </form>
      <Flex mt="5" w="100%" justifyContent="space-between">
        <Button
          variant="link"
          onClick={() =>
            //  setAddNewEvent(false)
            console.log("Test")
          }
        >
          Cancelar
        </Button>
        <Button
          variant="solid"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={() => handleSubmit()}
        >
          Agregar
        </Button>
      </Flex>
    </motion.div>
  );
}

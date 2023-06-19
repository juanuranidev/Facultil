import {
  Flex,
  Text,
  Image,
  Input,
  Select,
  Button,
  Drawer,
  DrawerBody,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import CloseIcon from "assets/icons/general/CloseIcon.png";
import Trash from "assets/icons/general/Trash.png";
import { addNewEventSchema } from "components/modals/modalCalendarEvents/Util";
import { EventModel } from "models/client/event.model";
import { useFormik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserModel } from "models/client/user.model";
import { postEventService } from "services/client/event.services";

interface ModalCalendarEventsProps {
  events: any;
  isOpen: boolean;
  user: UserModel;
  // onSubmit: (data: any) => void;
  onClose: () => void;
  dateSelected: string;
}

export default function ModalCalendarEvents({
  user,
  events,
  isOpen,
  onClose,
  dateSelected,
}: ModalCalendarEventsProps) {
  const toast = useToast();

  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addNewEvent, setAddNewEvent] = useState<boolean>(false);
  const [eventSelected, setEventSelected] = useState<number | null>(null);

  const handlePostEvent = async (event: EventModel) => {
    setIsLoading(true);
    try {
      const response: any = await postEventService(user._id, event);

      setIsLoading(false);
      onClose();

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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        time: "",
        title: "",
        date: new Date(dateSelected).toISOString(),
        is_active: true,
      },
      onSubmit: (values: EventModel) => {
        handlePostEvent(values);
      },
      validationSchema: addNewEventSchema,
    });

  return (
    <Drawer size="xl" placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          display="flex"
          alignItems="center"
          borderBottomWidth="1px"
          justifyContent="space-between"
        >
          <Text>Eventos</Text>
          <Image src={CloseIcon.src} w="5" onClick={onClose} />
        </DrawerHeader>
        <DrawerBody maxH="40vh" overflowY="scroll" px="4">
          {!addNewEvent
            ? events
                .sort((a: any, b: any) => (a.time > b.time ? 1 : -1))
                .map((event: any, index: number) => (
                  <motion.div
                    style={{
                      display: showDiv ? "none" : "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "2rem",
                    }}
                    key={index}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: "-5%" }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Text fontWeight="600" mr="2">
                      {event.time}:
                    </Text>
                    <Text w="100%" m="0">
                      {event.title}
                    </Text>
                    <Image
                      onClick={() => {
                        setShowDiv(true);
                        setEventSelected(index);
                      }}
                      src={Trash.src}
                      w="4"
                      mx="2"
                    />
                  </motion.div>
                ))
            : null}
          {!events.length ? (
            <Flex w="100%" py="5" justifyContent="center">
              <Text fontSize="lg" fontWeight="600">
                No tienes eventos
              </Text>
            </Flex>
          ) : null}
          {events.length && showDiv ? (
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.25rem",
                marginTop: "1.25rem",
              }}
              initial={{ opacity: 0, y: "-5%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Text fontSize="md" textAlign="center">
                ¿Está seguro que desea eliminar el evento{" "}
                {`${events[eventSelected!]?.time} ${
                  events[eventSelected!]?.title
                }`}
                ?
              </Text>
              <Flex mt="5" w="100%" justifyContent="space-between">
                <Button variant="link" onClick={() => setShowDiv(false)}>
                  Cancelar
                </Button>
                <Button variant="solid">Eliminar</Button>
              </Flex>
            </motion.div>
          ) : null}
        </DrawerBody>
        {addNewEvent ? (
          <motion.div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            }}
            initial={{ opacity: 0, y: "-5%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Flex mb="5" alignItems="center">
              <Text mx="2" fontSize="md">
                Fecha:
              </Text>
              <Text m="0" fontSize="md" fontWeight="600">
                {dateSelected}
              </Text>
            </Flex>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl
                mb="5"
                isInvalid={Boolean(touched.title && errors.title)}
              >
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
              <FormControl
                mb="5"
                isInvalid={Boolean(touched.time && errors.time)}
              >
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
              <Button variant="link" onClick={() => setAddNewEvent(false)}>
                Cancelar
              </Button>
              <Button variant="solid" onClick={() => handleSubmit()}>
                Agregar
              </Button>
            </Flex>
          </motion.div>
        ) : null}
        {!addNewEvent ? (
          <DrawerFooter borderTopWidth="1px">
            <Button width="100%" onClick={() => setAddNewEvent(true)}>
              Nuevo Evento
            </Button>
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}

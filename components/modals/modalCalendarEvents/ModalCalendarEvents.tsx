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
import { postEventService } from "services/client/event.services";
import { EventModel } from "models/client/event.model";
import { UserModel } from "models/client/user.model";
import { useFormik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "assets/icons/general/CloseIcon.png";
import moment from "moment";
import Trash from "assets/icons/general/Trash.png";
import FormNewEvent from "components/forms/formNewEvent/FormNewEvent";

interface ModalCalendarEventsProps {
  dayEvents: any;
  isOpen: boolean;
  user: UserModel;
  // onSubmit: (data: any) => void;
  onClose: () => void;
  dateSelected: string;
  handleGetEvents: (date: any) => void;
}

export default function ModalCalendarEvents({
  user,
  isOpen,
  onClose,
  dayEvents,
  dateSelected,
  handleGetEvents,
}: ModalCalendarEventsProps) {
  const toast = useToast();

  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addNewEvent, setAddNewEvent] = useState<boolean>(false);
  const [eventSelected, setEventSelected] = useState<number | null>(null);

  const deleteEvent = dayEvents.length && showDiv;

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
            ? dayEvents
                .sort((a: any, b: any) => (a.time > b.time ? 1 : -1))
                .map((event: any, index: number) => (
                  <motion.div
                    style={{
                      marginBottom: "2rem",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      display: showDiv ? "none" : "flex",
                    }}
                    key={index}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: "-5%" }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Text fontWeight="600" w="28">
                      {event.time}
                    </Text>
                    <Text m="0" textAlign="left" w="100%">
                      {event.title}
                    </Text>
                    <Image
                      onClick={() => {
                        setShowDiv(true);
                        setEventSelected(index);
                      }}
                      w="4"
                      mx="2"
                      src={Trash.src}
                    />
                  </motion.div>
                ))
            : null}
          {!dayEvents.length && !addNewEvent ? (
            <Flex w="100%" py="5" justifyContent="center">
              <Text fontSize="lg" fontWeight="600">
                No tienes eventos
              </Text>
            </Flex>
          ) : null}
          {deleteEvent ? (
            <motion.div
              style={{
                display: "flex",
                marginTop: "1.25rem",
                flexDirection: "column",
                marginBottom: "1.25rem",
              }}
              initial={{ opacity: 0, y: "-5%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Text fontSize="md" textAlign="center">
                ¿Está seguro que desea eliminar el evento{" "}
                {`${dayEvents[eventSelected!]?.time} ${
                  dayEvents[eventSelected!]?.title
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
          <FormNewEvent dateSelected={dateSelected} user={user} />
        ) : null}

        <FormNewEvent dateSelected={dateSelected} user={user} />
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

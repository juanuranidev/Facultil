import {
  Text,
  Flex,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import CloseIcon from "assets/icons/general/CloseIcon.png";
import Trash from "assets/icons/general/Trash.png";
import { motion } from "framer-motion";
import { useState } from "react";

interface ModalCalendarEventsProps {
  // body: string;
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: (data: any) => void;
  // isLoading: boolean;
  events: any;
}

export default function ModalCalendarEvents({
  // body,
  isOpen,
  onClose,
  events,
}: // onSubmit,
// isLoading,
ModalCalendarEventsProps) {
  const [showDiv, setShowDiv] = useState(false);
  const [eventSelected, setEventSelected] = useState<number | null>(null);

  console.log(events);
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
          {events
            .sort((a: any, b: any) => (a.time > b.time ? 1 : -1))
            .map((event: any, index: number) => (
              <motion.div
                // mb="8"

                style={{
                  display: showDiv ? "none" : "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
                as={Flex}
                key={index}
                display={showDiv ? "none" : "flex"}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: "-5%" }}
                transition={{ delay: index * 0.1 }}
                alignItems="flex-start"
                justifyContent="space-between"
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
            ))}
          {!events.length ? (
            <Flex w="100%" py="5" justifyContent="center">
              <Text fontSize="lg" fontWeight="600">
                No tienes eventos
              </Text>
            </Flex>
          ) : null}
          {showDiv && (
            <Flex
              flexDirection="column"
              my="5"
              as={motion.div}
              initial={{ opacity: 0, x: "0" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Text fontSize="md" textAlign="center">
                ¿Está seguro que desea eliminar el evento{" "}
                {`${events[eventSelected!].time} ${
                  events[eventSelected!].title
                }`}
                ?
              </Text>
              <Flex mt="5" w="100%" justifyContent="space-between">
                <Button variant="link" onClick={() => setShowDiv(false)}>
                  Cancelar
                </Button>
                <Button variant="solid">Eliminar</Button>
              </Flex>
              {/* <Text onClick={() => setShowDiv(false)}>dawdaodin</Text> */}
            </Flex>
          )}
        </DrawerBody>
        {!showDiv ? (
          <DrawerFooter borderTopWidth="1px">
            <Button width="100%">Nuevo Evento</Button>
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}

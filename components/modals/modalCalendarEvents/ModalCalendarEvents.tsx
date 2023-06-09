import {
  Text,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import CloseIcon from "assets/icons/general/CloseIcon.png";

interface ModalCalendarEventsProps {
  // body: string;
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: (data: any) => void;
  // isLoading: boolean;
}

export default function ModalCalendarEvents({
  // body,
  isOpen,
  onClose,
}: // onSubmit,
// isLoading,
ModalCalendarEventsProps) {
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
        <DrawerBody maxH="40vh" overflowY="scroll">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button width="100%">Nuevo Evento</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

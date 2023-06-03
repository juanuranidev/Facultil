import {
  Flex,
  Menu,
  Avatar,
  Heading,
  MenuItem,
  MenuList,
  Container,
  MenuButton,
} from "@chakra-ui/react";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { signOut } from "next-auth/react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <Flex p="5" w="100%" alignItems="center" justifyContent="space-between">
      <Heading size="md">¡Hola {user?.name.split(" ")[0]}!</Heading>
      <Menu>
        <MenuButton>
          <Avatar src={user?.image} name={user?.name} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Cerras Sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

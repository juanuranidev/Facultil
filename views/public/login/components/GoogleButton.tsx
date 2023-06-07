import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import GoogleIcon from "assets/icons/GoogleIcon.svg";
import Image from "next/image";

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Button
      shadow="sm"
      bg="#ffffff"
      fontSize="14px"
      color="#000000"
      borderRadius="sm"
      isDisabled={isLoading}
      onClick={handleSignIn}
      border="1px solid grey"
      _hover={{ bg: "#f7f5f5" }}
      _active={{ bg: "#f7f5f5" }}
      _disabled={{ bg: "#f7f5f5" }}
      leftIcon={
        <Image
          width="25"
          height="25"
          src={GoogleIcon.src}
          alt="ícono de google"
        />
      }
    >
      Continuar con Google
    </Button>
  );
}

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { chakraTheme } from "../assets/chakra/chakraTheme";
import Head from "next/head";
import "assets/css/globals.css";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={chakraTheme}>
        <Head>
          <title>Facultil</title>
          <meta
            name="description"
            content="Organiza todo tu espacio de estudio en un sólo lugar."
          />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

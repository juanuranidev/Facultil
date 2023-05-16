import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "../assets/chakra/chakraTheme";
import Head from "next/head";
import "assets/css/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Head>
        <title>Facultil</title>
        <meta
          name="description"
          content="Organiza todo tu espacio de estudio en un sólo lugar."
        />
        {/* <link rel="icon" href="/" /> */}
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

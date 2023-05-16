import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "assets/chakra/button/buttonStyles";

export const chakraTheme = extendTheme({
  colors: {
    background: {
      primary: "#ffffff",
      secondary: "#f5f5f7",
      tertiary: "#1d1d1f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ed394d",
      tertiary: "#1d1d1f",
    },
  },
  shadows: {
    brand_shadow_md:
      "0 4px 6px -1px rgba(237, 57, 77, 0.1),0 2px 4px -1px rgba(237, 57, 77, 0.5)",
    brand_shadow_lg:
      "0 10px 15px -3px rgba(237, 57, 77, 0.1),0 4px 6px -2px rgba(237, 57, 77, 0.7);",
  },
  components: {
    Button,
  },
});

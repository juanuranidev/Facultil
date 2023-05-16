export const ButtonStyles = {
  variants: {
    solid: {
      bg: "#ed394d",
      shadow: "md",
      borderRadius: "2rem",
      color: "#ffffff",
      _hover: {
        bg: "#ee4c5e",
        _disabled: {
          bg: "#ed394d",
        },
      },
      _active: {
        bg: "#ef5d6e",
        shadow: "md",
        _disabled: {
          shadow: "none",
        },
      },
      _disabled: {
        _hover: {
          bg: "#f27f8c",
        },
      },
    },
    link: {
      color: "#007ce6",
      _hover: {
        decoration: "udnerline",
      },
      _active: {
        color: "#0063ba",
      },
    },
    _disabled: {
      color: "#006498",
      _hover: {
        color: "#006498",
      },
    },
  },
};

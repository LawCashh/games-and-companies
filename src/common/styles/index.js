import { extendTheme } from "@chakra-ui/react";

const tailwindBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export default extendTheme({
  breakpoints: tailwindBreakpoints,
});

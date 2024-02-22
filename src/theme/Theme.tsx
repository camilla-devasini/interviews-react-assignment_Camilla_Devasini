import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1300,
    xxl: 1600,
  },
};

export const theme = createTheme({
  breakpoints,
});

import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { ReactNode } from "react";

export default function ThemeEngine({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

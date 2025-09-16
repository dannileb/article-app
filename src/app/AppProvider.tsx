import { PropsWithChildren } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

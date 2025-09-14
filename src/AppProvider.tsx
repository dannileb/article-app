import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./router/routes";
import { ThemeProvider } from "./theme/ThemeProvider";

const router = createBrowserRouter(routes);

export const AppProvider = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

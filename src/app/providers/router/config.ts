import { AppLayout } from "#/app/AppLayout";
import AboutPage from "#/pages/AboutPage";
import MainPage from "#/pages/MainPage";
import { RoutePath } from "#/shared/config/routeConfig/routeConfig";
import { createBrowserRouter } from "react-router";

export const routerConfig = createBrowserRouter([
  {
    path: RoutePath.main,
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: RoutePath.about,
        Component: AboutPage,
      },
    ],
  },
]);

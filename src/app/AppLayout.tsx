import { Outlet } from "react-router";
import { NavBar } from "#/widgets/NavBar";
import { useTheme } from "#/app/providers/ThemeProvider";
import classNames from "classnames";

export const AppLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", theme)}>
      <NavBar />
      <Outlet />
    </div>
  );
};

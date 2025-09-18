import { Outlet } from "react-router";
import { NavBar } from "#/widgets/NavBar";
import { useTheme } from "#/app/providers/ThemeProvider";
import classNames from "classnames";
import { SideBar } from "#/widgets/SideBar";

export const AppLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", theme)}>
      <NavBar />
      <div className="content-page">
        <SideBar />
        <div className="page-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

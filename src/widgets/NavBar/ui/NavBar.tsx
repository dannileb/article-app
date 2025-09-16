import { RoutePath } from "#/shared/config/routeConfig/routeConfig";
import classNames from "classnames";
import { Link } from "react-router";
import classes from "./NavBar.module.scss";
import { AppLink } from "#/shared/ui/AppLink/AppLink";

export const NavBar = () => {
  return (
    <div className={classNames(classes.navbar)}>
      <div className={classes.links}>
        <AppLink to={RoutePath.main} className={classes.mainLink}>
          Главная
        </AppLink>
        <AppLink to={RoutePath.about} view="secondary">
          О сайте
        </AppLink>
      </div>
    </div>
  );
};

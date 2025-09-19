import { RoutePath } from "#/shared/config/routeConfig/routeConfig";
import classNames from "classnames";
import classes from "./NavBar.module.scss";
import { AppLink } from "#/shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const { t } = useTranslation();
  return (
      <div className={classNames(classes.navbar)}>
          <div className={classes.links}>
              <AppLink to={RoutePath.main} className={classes.mainLink}>
                  {t("navBarLabel-main")}
              </AppLink>
              <AppLink to={RoutePath.about} view="secondary">
                  {t("navBarLabel-about")}
              </AppLink>
          </div>
      </div>
  );
};

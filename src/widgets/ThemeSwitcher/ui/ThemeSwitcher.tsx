import { Theme, useTheme } from "#/app/providers/ThemeProvider";
import classNames from "classnames";
import classes from "./ThemeSwitcher.module.scss";
import LightIcon from "#/shared/assets/icons/theme-light.svg";
import DarkIcon from "#/shared/assets/icons/theme-dark.svg";
import { Button } from "#/shared/ui/Button/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
      <Button
          className={classNames(classes.ThemeSwitcher, className)}
          onClick={toggleTheme}
          view="clear"
      >
          {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
      </Button>
  );
};

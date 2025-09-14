import { useState } from "react";
import "./styles/index.scss";
import { Theme, useThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import classNames from "classnames";

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", theme)}>
      <button onClick={toggleTheme}>toggle</button>
      dsfgdfsg
    </div>
  );
};

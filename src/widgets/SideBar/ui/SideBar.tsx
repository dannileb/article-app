import { useState } from "react";
import classes from "./SideBar.module.scss";
import classNames from "classnames";
import { ThemeSwitcher } from "#/widgets/ThemeSwitcher";
import { LangSwitcher } from "#/widgets/LangSwitcher/ui/LangSwitcher";

interface SideBarProps {}

export const SideBar = ({}: SideBarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      className={classNames(classes.sidebar, {
        [classes.collapsed]: collapsed,
      })}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};

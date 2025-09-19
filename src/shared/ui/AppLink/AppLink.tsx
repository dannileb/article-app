import { Link, LinkProps } from "react-router";
import classes from "./AppLink.module.scss";
import { PropsWithChildren } from "react";
import classNames from "classnames";

interface AppLinkProps extends LinkProps {
  view?: "primary" | "secondary";
}

export const AppLink = ({
  children,
  className,
  view = "primary",
  ...props
}: PropsWithChildren<AppLinkProps>) => {
  return (
      <Link
          {...props}
          className={classNames(classes.appLink, classes[view], className)}
      >
          {children}
      </Link>
  );
};

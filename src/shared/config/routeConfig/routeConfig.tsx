export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  NOT_FOUNT = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.NOT_FOUNT]: "*"
};

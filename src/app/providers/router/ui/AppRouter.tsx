import { routerConfig } from "#/app/providers/router/config";
import { Suspense } from "react";
import { RouterProvider } from "react-router";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={routerConfig} />
    </Suspense>
  );
};
export default AppRouter;

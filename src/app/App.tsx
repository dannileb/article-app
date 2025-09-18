import { AppProvider } from "#/app/AppProvider";
import AppRouter from "#/app/providers/router/ui/AppRouter";
import { Suspense } from "react";

export const App = () => {
  return (
    <Suspense fallback="Загрузка...">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </Suspense>
  );
};

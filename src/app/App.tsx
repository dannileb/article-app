import { AppProvider } from '#/app/AppProvider';
import AppRouter from '#/app/providers/router/ui/AppRouter';

export const App = () => {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
};

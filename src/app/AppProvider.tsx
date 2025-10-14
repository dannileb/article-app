import { PropsWithChildren } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
    );
};

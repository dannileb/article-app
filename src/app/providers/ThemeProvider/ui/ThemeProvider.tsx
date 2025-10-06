import { PropsWithChildren, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '#/shared/config/theme/ThemeContext';
import { ThemeWrapper } from '#/shared/ui/ThemeWrapper';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) return saved;

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? Theme.DARK
            : Theme.LIGHT;
    });

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <ThemeWrapper theme={theme}>{children}</ThemeWrapper>
        </ThemeContext.Provider>
    );
};

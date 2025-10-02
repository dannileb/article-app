import { forwardRef, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';

type ThemeProps = React.HTMLAttributes<HTMLDivElement> & {
    theme?: Theme;
};

const ThemeProvider = forwardRef<HTMLDivElement, ThemeProps>(
    ({ theme: themeProps, ...props }, ref) => {
        const [theme, setTheme] = useState<Theme>(() => {
            if (themeProps) {
                return themeProps;
            }
            const saved = localStorage.getItem('theme') as Theme;
            if (saved) return saved;

            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? Theme.DARK
                : Theme.LIGHT;
        });

        const value = useMemo(() => ({ theme, setTheme }), [theme]);

        return (
            <ThemeContext.Provider value={value}>
                <div {...props} ref={ref} data-theme={theme}>
                    {props.children}
                </div>
            </ThemeContext.Provider>
        );
    },
);

export default ThemeProvider;

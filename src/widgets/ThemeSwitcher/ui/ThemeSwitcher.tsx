import { Theme, useTheme } from '#/app/providers/ThemeProvider';
import { Button } from '#/shared/ui/Button/Button';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button className={className} onClick={toggleTheme} view="clear">
            {theme === Theme.DARK ? <SunOutlined /> : <MoonOutlined />}
        </Button>
    );
};

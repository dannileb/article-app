import { useState } from 'react';
import classes from './SideBar.module.scss';
import classNames from 'classnames';
import { ThemeSwitcher } from '#/widgets/ThemeSwitcher';
import { LangSwitcher } from '#/widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from '#/shared/ui/Button/Button';

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    return (
        <div
            data-testid="sidebar"
            className={classNames(classes.sidebar, {
                [classes.collapsed]: collapsed,
            })}
        >
            <Button data-testid="sidebar-toggle" onClick={onToggle}>
                +
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    );
};

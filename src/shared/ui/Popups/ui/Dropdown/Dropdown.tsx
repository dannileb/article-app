import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import cls from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { DropdownDirection } from '#/shared/ui/Popups/types/Popups.types';
import classNames from 'classnames';
import { AppLink } from '#/shared/ui/AppLink/AppLink';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = 'bottomRight' } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
            <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <MenuItem
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem as={Fragment} disabled={item.disabled}>
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}

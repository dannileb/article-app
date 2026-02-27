import {
    Popover as HPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react';
import { ReactNode } from 'react';
import { mapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { DropdownDirection } from '#/shared/ui/Popups/types/Popups.types';
import classNames from 'classnames';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const { className, trigger, direction = 'bottomRight', children } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <PopoverButton as="div" className={popupCls.trigger}>
                {trigger}
            </PopoverButton>
            <PopoverPanel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </PopoverPanel>
        </HPopover>
    );
}

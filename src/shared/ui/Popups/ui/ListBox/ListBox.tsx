import { Fragment, ReactNode } from 'react';
import {
    Listbox as HListBox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { DropdownDirection } from '#/shared/ui/Popups/types/Popups.types';
import classNames from 'classnames';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottomRight',
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <div
            className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        >
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <ListboxButton disabled={readonly} className={cls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </ListboxButton>
                <ListboxOptions
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <ListboxOption
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </HListBox>
        </div>
    );
}

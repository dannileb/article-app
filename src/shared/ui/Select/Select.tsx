import classNames from 'classnames';
import { memo, useId } from 'react';
import classes from './Select.module.scss';

interface DefaultSelectItem {
    label: string;
    value: string;
}

export interface SelectProps<T extends DefaultSelectItem> {
    /** Метка поля ввода */
    label?: string;
    /** Тип текстового поля */
    items: T[];
    // /** Визуальный стиль компонента */
    // view?: 'clear' | 'primary' | 'secondary' | 'compact';
    // /** Форма границ компонента */
    // form?: 'default' | 'brick' | 'rounded';
    /** Значение текстового поля */
    value?: T;
    /** Обработчик изменения значения */
    onChange?: (value: T) => void;
    /** Обязательное поле */
    required?: boolean;
    /** Дополнительный класс */
    className?: string;
}

const SelectInner = <T extends DefaultSelectItem>({
    items,
    value,
    onChange,
    className,
    label,
    required,
}: // view = 'primary',
// form = 'default',
SelectProps<T>) => {
    const labelId = useId();
    console.debug(value);
    return (
        <label
            htmlFor={labelId}
            className={classNames(
                classes.selectContainer,
                // classes[view],
                // classes[form],
                className,
            )}
        >
            {label && (
                <span className={classes.selectLabel}>
                    {label}
                    {required && (
                        <span className={classes.selectRequired}>*</span>
                    )}
                </span>
            )}
            <select
                id={labelId}
                value={value?.value}
                className={classes.select}
                onChange={(e) => {
                    const selectedItem = items.find(
                        (item) => item.value === e.target.value,
                    );
                    if (selectedItem) {
                        onChange?.(selectedItem);
                    }
                }}
            >
                {items.map((item) => (
                    <option
                        key={item.value}
                        value={item.value}
                        className={classes.selectOption}
                    >
                        {item.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export const Select = memo(SelectInner) as typeof SelectInner;

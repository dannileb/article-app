import classNames from 'classnames';
import { memo, useId } from 'react';
import classes from './Select.module.scss';

interface DefaultSelectItem {
    label: string;
    value: string;
}

export interface SelectProps<T = DefaultSelectItem> {
    /** Метка поля ввода */
    label?: string;
    /** Тип текстового поля */
    items: T[];
    // /** Визуальный стиль компонента */
    // view?: 'clear' | 'primary' | 'secondary' | 'compact';
    // /** Форма границ компонента */
    // form?: 'default' | 'brick' | 'rounded';
    /** Значение текстового поля */
    value?: string;
    /** Обработчик изменения значения */
    onChange?: (value: string) => void;
    /** Обязательное поле */
    required?: boolean;
    /** Дополнительный класс */
    className?: string;
}

const SelectInner = ({
    items,
    value,
    onChange,
    className,
    label,
    required,
}: // view = 'primary',
// form = 'default',
SelectProps) => {
    const labelId = useId();

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
                value={value}
                className={classes.select}
                onChange={(e) => {
                    console.debug(e.target.value);
                    onChange?.(e.target.value);
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

export const Select = memo(SelectInner);

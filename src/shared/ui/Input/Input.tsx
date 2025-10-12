import classNames from 'classnames';
import { ChangeEventHandler, InputHTMLAttributes, memo, useState } from 'react';
import classes from './Input.module.scss';
import { Button } from '#/shared/ui/Button/Button';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

/**
 * Компонент текстового поля ввода с поддержкой различных стилей и типов
 */
export interface InputProps extends HTMLInputProps {
    /** Метка поля ввода */
    label?: string;
    /** Тип текстового поля */
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    /** Визуальный стиль компонента */
    view?: 'clear' | 'primary' | 'secondary' | 'compact';
    /** Форма границ компонента */
    form?: 'default' | 'brick' | 'rounded';
    /** Значение текстового поля */
    value?: string;
    /** Обработчик изменения значения */
    onChange?: (value: string) => void;
}

const InputInner = ({
    value,
    onChange,
    className,
    type = 'text',
    label,
    ...props
}: InputProps) => {
    const [typeLocal, setTypeLocal] = useState<InputProps['type']>(type);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange?.(e.target.value);
    };

    const handleChangePasswordVisibility = () => {
        setTypeLocal((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    return (
        <label className={classNames(classes.inputContainer, className)}>
            {label && <span className={classes.inputLabel}>{label}</span>}
            <div className={classes.inputBody}>
                <input
                    type={typeLocal}
                    value={value}
                    onChange={handleOnChange}
                    {...props}
                    className={classes.input}
                />
                {type === 'password' && (
                    <Button
                        className={classes.inputPasswordButton}
                        view="compact"
                        onClick={handleChangePasswordVisibility}
                    >
                        {typeLocal === 'password' ? (
                            <EyeOutlined />
                        ) : (
                            <EyeInvisibleOutlined />
                        )}
                    </Button>
                )}
            </div>
        </label>
    );
};

export const Input = memo(InputInner);

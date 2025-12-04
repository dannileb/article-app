import classNames from 'classnames';
import {
    ChangeEventHandler,
    ComponentProps,
    InputHTMLAttributes,
    memo,
    useId,
    useState,
} from 'react';
import classes from './Input.module.scss';
import { Button } from '#/shared/ui/Button/Button';
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    SendOutlined,
} from '@ant-design/icons';

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
    /** Обязательное поле */
    required?: boolean;
    /** Кнопка действия */
    withActionButton?: boolean;
    /** Иконка действия */
    actionButtonIcon?: React.ReactNode;
    /** Обработчик действия */
    onActionButtonClick?: ComponentProps<typeof Button>['onClick'];
}

const InputInner = ({
    value,
    onChange,
    className,
    type = 'text',
    label,
    required,
    view = 'primary',
    form = 'default',
    withActionButton,
    onActionButtonClick,
    actionButtonIcon,
    ...props
}: InputProps) => {
    const labelId = useId();

    const [typeLocal, setTypeLocal] = useState<InputProps['type']>(type);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange?.(e.target.value);
    };

    const handleChangePasswordVisibility = () => {
        setTypeLocal((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    return (
        <label
            htmlFor={labelId}
            className={classNames(
                classes.inputContainer,
                classes[view],
                classes[form],
                className,
            )}
        >
            {label && (
                <span className={classes.inputLabel}>
                    {label}
                    {required && (
                        <span className={classes.inputRequired}> *</span>
                    )}
                </span>
            )}
            <div className={classes.inputBody}>
                <input
                    id={labelId}
                    type={typeLocal}
                    value={value}
                    onChange={handleOnChange}
                    {...props}
                    className={classes.input}
                />
                {withActionButton ? (
                    <Button
                        className={classes.inputActionButton}
                        view="compact"
                        onClick={onActionButtonClick}
                    >
                        {actionButtonIcon ?? <SendOutlined />}
                    </Button>
                ) : (
                    type === 'password' && (
                        <Button
                            className={classes.inputActionButton}
                            view="compact"
                            onClick={handleChangePasswordVisibility}
                        >
                            {typeLocal === 'password' ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </Button>
                    )
                )}
            </div>
        </label>
    );
};

export const Input = memo(InputInner);

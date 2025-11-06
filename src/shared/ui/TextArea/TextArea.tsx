import { memo } from 'react';
import classes from './TextArea.module.scss';
import classNames from 'classnames';
import TextareaAutosize, {
    TextareaAutosizeProps,
} from 'react-textarea-autosize';

/**
 * Компонент текстового поля ввода с поддержкой различных стилей и типов
 */
export interface TextAreaProps extends Omit<TextareaAutosizeProps, 'onChange'> {
    /** Метка поля ввода */
    label?: string;
    /** Визуальный стиль компонента */
    view?: 'clear' | 'primary' | 'secondary' | 'code';
    /** Форма границ компонента */
    form?: 'default' | 'brick' | 'rounded';
    /** Значение текстового поля */
    value?: string;
    /** Обработчик изменения значения */
    onChange?: (value: string) => void;
    /** Обязательное поле */
    required?: boolean;
}

const TAB = '\t';

const TextAreaInner = ({
    value,
    onChange,
    className,
    label,
    required,
    view = 'primary',
    form = 'default',
    ...props
}: TextAreaProps) => {
    return (
        <label
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
                <TextareaAutosize
                    value={value}
                    onChange={(e) => {
                        onChange?.(e.target.value);
                    }}
                    {...props}
                    className={classes.input}
                    onKeyDown={(e) => {
                        if (e.code === 'Tab' && view === 'code') {
                            e.preventDefault();
                            const textarea = e.currentTarget;
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;

                            const newValue =
                                value?.substring(0, start) +
                                TAB +
                                value?.substring(end);

                            onChange?.(newValue);

                            setTimeout(() => {
                                textarea.selectionStart =
                                    textarea.selectionEnd = start + TAB.length;
                            }, 0);
                        }
                        props.onKeyDown?.(e);
                    }}
                />
            </div>
        </label>
    );
};

export const TextArea = memo(TextAreaInner);

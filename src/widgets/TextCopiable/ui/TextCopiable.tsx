import { Text } from '#/shared/ui/Text/Text';
import { ComponentProps, memo, useCallback } from 'react';
import classes from './TextCopiable.module.scss';
import classNames from 'classnames';
import { Button } from '#/shared/ui/Button/Button';
import { useCopyToClipboard } from '#/shared/lib/hooks/useCopyToClipboard';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';

interface TextCopiableProps extends ComponentProps<typeof Text> {
    monospace?: boolean;
    copyingText?: string;
}

export const TextCopiable = memo(
    ({ children, copyingText, monospace, ...props }: TextCopiableProps) => {
        const { copied, copyToClipboard } = useCopyToClipboard();

        const handleCopy = useCallback(() => {
            copyToClipboard(copyingText);
        }, [copyToClipboard, copyingText]);

        return (
            <div
                className={classNames(
                    classes.copiableWrapper,
                    classes[props.view ?? 'primary'],
                )}
            >
                <Text
                    {...props}
                    className={classNames(
                        classes[props.view ?? 'primary'],
                        {
                            [classes.monospace]: monospace,
                        },
                        props.className,
                    )}
                >
                    {children}
                </Text>
                <Button view="compact" onClick={handleCopy}>
                    {copied ? <CheckOutlined /> : <CopyOutlined />}
                </Button>
            </div>
        );
    },
);

TextCopiable.displayName = 'TextCopiable';

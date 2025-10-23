import { Text } from '#/shared/ui/Text/Text';
import {
    ComponentProps,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classes from './TextCopiable.module.scss';
import classNames from 'classnames';

interface TextCopiableProps extends ComponentProps<typeof Text> {
    monospace?: boolean;
    copyingText?: string;
}

export const TextCopiable = memo(
    ({
        onClick,
        children,
        copyingText,
        monospace,
        ...props
    }: TextCopiableProps) => {
        const [copied, setCopied] = useState<boolean>(false);
        const timerRef = useRef<NodeJS.Timeout>(null);

        const handleClick = useCallback(
            async (e: React.MouseEvent<HTMLParagraphElement>) => {
                if (navigator.clipboard) {
                    try {
                        await navigator.clipboard.writeText(
                            copyingText ?? `${children}`,
                        );
                        setCopied(true);
                        if (timerRef.current) {
                            clearTimeout(timerRef.current);
                        }
                        timerRef.current = setTimeout(() => {
                            setCopied(false);
                        }, 250);
                    } catch (err) {
                        console.error('Failed to copy text: ', err);
                    }
                }
                onClick?.(e);
            },
            [onClick, children, copyingText],
        );

        useEffect(() => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }, []);

        return (
            <Text
                {...props}
                className={classNames(
                    classes.copiable,
                    classes[props.view ?? 'primary'],
                    {
                        [classes.monospace]: monospace,
                        [classes.copied]: copied,
                    },
                    props.className,
                )}
                onClick={handleClick}
            >
                {children}
            </Text>
        );
    },
);

TextCopiable.displayName = 'TextCopiable';

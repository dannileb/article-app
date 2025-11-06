import { CloseCircleOutlined } from '@ant-design/icons';
import { forwardRef, memo, useCallback } from 'react';
import classes from './Tag.module.scss';
import classNames from 'classnames';

interface TagProps {
    onDelete?: (tag: string) => void;
    deletable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    size?: 's' | 'm' | 'l';
    children: string;
}

const TagInner = forwardRef<HTMLDivElement, TagProps>(
    ({ onDelete, deletable, className, children, style, size = 'm' }, ref) => {
        const handleDelete = useCallback(() => {
            onDelete?.(children);
        }, [children, onDelete]);

        return (
            <div
                ref={ref}
                className={classNames(
                    classes.tag,
                    className,
                    classes[`size_${size}`],
                )}
                style={style}
            >
                {children}
                {deletable && (
                    <button
                        className={classes.deleteButton}
                        onClick={handleDelete}
                    >
                        <CloseCircleOutlined />
                    </button>
                )}
            </div>
        );
    },
);

export const Tag = memo(TagInner);

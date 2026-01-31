import { Button } from '#/shared/ui/Button/Button';
import classNames from 'classnames';
import classes from './Toggle.module.scss';

interface ToggleItem {
    key: string | number;
    label?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
}

interface ToggleProps<I extends ToggleItem> {
    items: I[];
    toggledKey: string | number;
    onToggle?: (item: I) => void;
}

export const Toggle = <I extends ToggleItem>({
    items,
    toggledKey,
    onToggle,
}: ToggleProps<I>) => {
    return (
        <div className={classes.togglesContainer}>
            {items.map((item) => (
                <Button
                    key={item.key}
                    onClick={() => {
                        item.onClick?.();
                        onToggle?.(item);
                    }}
                    view="clear"
                    className={classNames(classes.toggle, {
                        [classes.toggled]: item.key === toggledKey,
                    })}
                    icon={item.icon}
                    // iconPosition={item.iconPosition}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
};

import { StarFilled } from '@ant-design/icons';
import classes from './StarRating.module.scss';
import { Button } from '#/shared/ui/Button/Button';
import classNames from 'classnames';
import { memo } from 'react';

export interface StarRatingProps {
    ratingRange?: 5 | 10;
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

const StarRatingInner = ({
    ratingRange = 5,
    value = 0,
    onChange,
    disabled,
}: StarRatingProps) => {
    const handleChange = (value: number) => () => {
        onChange?.(value);
    };

    return (
        <div
            className={classes.ratingContainer}
            aria-label={`rating: ${value}`}
        >
            {Array.from({ length: ratingRange }).map((_, i) => (
                <Button
                    key={i}
                    view="compact"
                    className={classNames(classes.starButton, {
                        [classes.starButton_rated]: value > i,
                    })}
                    icon={<StarFilled className={classes.starIcon} />}
                    disabled={disabled}
                    onClick={handleChange(i + 1)}
                    data-testid={`StarRating.StarButton.${i + 1}`}
                />
            ))}
        </div>
    );
};

export const StarRating = memo(StarRatingInner) as typeof StarRatingInner;

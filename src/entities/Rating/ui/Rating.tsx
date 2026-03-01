import { StarRating, StarRatingProps } from '#/shared/ui/StarRating';
import { useEffect, useState } from 'react';
import classes from './Rating.module.scss';
import { Heading } from '#/shared/ui/Heading/Heading';
import classNames from 'classnames';
import { Input } from '#/shared/ui/Input/Input';
import { Button } from '#/shared/ui/Button/Button';
import { Text } from '#/shared/ui/Text/Text';
import { EditOutlined } from '@ant-design/icons';

type WithFeedback = {
    withFeedback: true;
    feedbackPlaceholder?: string;
    sendFeedbackButonText?: string;
    feedback?: string;
};

type WithoutFeedback = {
    withFeedback?: false;
    feedbackPlaceholder?: never;
    sendFeedbackButonText?: never;
    feedback?: never;
};

type RatingProps = {
    title?: string;
    className?: string;
    onSendFeedback?: (rating: number, feedback: string) => void;
    feedbackPlaceholder?: string;
    sendFeedbackButonText?: string;
    withFeedback?: boolean;
    feedback?: string;
} & (WithFeedback | WithoutFeedback) &
    StarRatingProps;

export const Rating = ({
    title,
    className,
    withFeedback,
    onSendFeedback,
    feedbackPlaceholder,
    sendFeedbackButonText,
    feedback,
    ...ratingProps
}: RatingProps) => {
    const [rating, setRating] = useState<number>(ratingProps.value ?? 0);
    const [feedbackLocal, setFeedbackLocal] = useState<string>(feedback ?? '');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleSendFeedback = () => {
        onSendFeedback?.(rating, feedbackLocal);
        setIsEditing(false);
    };

    const handleRatingChange = (rating: number) => {
        if (withFeedback) {
            setRating(rating);
        } else {
            setRating(rating);
            onSendFeedback?.(rating, '');
        }
        ratingProps.onChange?.(rating);
    };

    useEffect(() => {
        setRating(ratingProps.value ?? 0);
    }, [ratingProps.value]);

    useEffect(() => {
        setFeedbackLocal(feedback ?? '');
    }, [feedback]);

    return (
        <div
            className={classNames(classes.ratingContainer, className)}
            data-testid="Rating.Wrapper"
        >
            {title && (
                <Heading level={5} data-testid="Rating.Title">
                    {title}
                </Heading>
            )}
            <StarRating
                ratingRange={ratingProps.ratingRange}
                value={rating}
                onChange={handleRatingChange}
                disabled={ratingProps.disabled || (withFeedback && !isEditing)}
            />
            {withFeedback && (
                <div
                    className={classNames(classes.feedbackContainer, {
                        [classes.feedbackContainer_editing]: isEditing,
                    })}
                >
                    {isEditing ? (
                        <>
                            <Input
                                type="text"
                                placeholder={feedbackPlaceholder}
                                className={classes.feedbackInput}
                                value={feedbackLocal}
                                onChange={setFeedbackLocal}
                                data-testid="Rating.FeedbackInput"
                            />
                            <Button
                                onClick={handleSendFeedback}
                                className={classes.feedbackButton}
                                data-testid="Rating.SendFeedbackButton"
                            >
                                {sendFeedbackButonText ?? 'Отправить'}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text data-testid="Rating.FeedbackText">
                                {feedback}
                            </Text>
                            <Button
                                view="clear"
                                icon={<EditOutlined />}
                                onClick={() => setIsEditing(true)}
                                data-testid="Rating.EditButton"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

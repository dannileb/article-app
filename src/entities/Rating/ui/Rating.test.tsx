import { Rating } from './Rating';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Rating.test', () => {
    it('should pass props to star rating', () => {
        const ratingRange = 10;
        const onChange = jest.fn();

        render(
            <Rating ratingRange={ratingRange} value={5} onChange={onChange} />,
        );
        Array.from({ length: ratingRange }).forEach((_, i) => {
            fireEvent.click(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            );
            expect(onChange).toHaveBeenCalledWith(i + 1);
        });
    });

    it('should pass disabled prop to star rating', () => {
        render(<Rating disabled ratingRange={5} />);
        Array.from({ length: 5 }).forEach((_, i) => {
            expect(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            ).toBeDisabled();
        });
    });

    it('should display title', () => {
        render(<Rating title="My Rating" ratingRange={5} />);
        expect(screen.getByTestId('Rating.Title')).toHaveTextContent(
            'My Rating',
        );
    });

    it('should call onSendFeedback by star click if no feedbaack input', () => {
        const onSendFeedback = jest.fn();
        render(<Rating onSendFeedback={onSendFeedback} ratingRange={5} />);
        Array.from({ length: 5 }).forEach((_, i) => {
            fireEvent.click(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            );
            expect(onSendFeedback).toHaveBeenCalledWith(i + 1, '');
        });
    });

    it('should change edit mode', () => {
        render(<Rating ratingRange={5} withFeedback />);
        fireEvent.click(screen.getByTestId('Rating.EditButton'));
        expect(screen.getByTestId('Rating.FeedbackInput')).toBeInTheDocument();
        expect(
            screen.getByTestId('Rating.SendFeedbackButton'),
        ).toBeInTheDocument();
    });

    it('should call onSendFeedback only by send click if has feedback input', () => {
        const onSendFeedback = jest.fn();
        render(
            <Rating
                onSendFeedback={onSendFeedback}
                ratingRange={5}
                withFeedback
            />,
        );
        fireEvent.click(screen.getByTestId('Rating.EditButton'));
        fireEvent.click(screen.getByTestId(`StarRating.StarButton.3`));
        expect(onSendFeedback).toHaveBeenCalledTimes(0);
        fireEvent.click(screen.getByTestId('Rating.SendFeedbackButton'));
        expect(onSendFeedback).toHaveBeenCalledTimes(1);
    });

    it('should disable stars on view mode', () => {
        render(<Rating ratingRange={5} withFeedback />);
        Array.from({ length: 5 }).forEach((_, i) => {
            expect(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            ).toBeDisabled();
        });
    });

    it('should change feedback input', () => {
        render(<Rating ratingRange={5} withFeedback />);
        fireEvent.click(screen.getByTestId('Rating.EditButton'));
        fireEvent.change(screen.getByTestId('Rating.FeedbackInput'), {
            target: { value: 'My feedback' },
        });
        expect(screen.getByTestId('Rating.FeedbackInput')).toHaveValue(
            'My feedback',
        );
    });

    it('shoud call onSendFeedback with parameters', () => {
        const onSendFeedback = jest.fn();
        render(
            <Rating
                onSendFeedback={onSendFeedback}
                ratingRange={5}
                withFeedback
            />,
        );
        fireEvent.click(screen.getByTestId('Rating.EditButton'));
        fireEvent.change(screen.getByTestId('Rating.FeedbackInput'), {
            target: { value: 'My feedback' },
        });
        fireEvent.click(screen.getByTestId('StarRating.StarButton.3'));
        fireEvent.click(screen.getByTestId('Rating.SendFeedbackButton'));
        expect(onSendFeedback).toHaveBeenCalledWith(3, 'My feedback');
    });

    it('should pass wrapper classname, feedback placeholder, send feedback button text and feedback text', () => {
        render(
            <Rating
                ratingRange={5}
                className="className"
                feedbackPlaceholder="Enter your feedback"
                sendFeedbackButonText="Send feedback"
                feedback="Your feedback"
                withFeedback
            />,
        );
        fireEvent.click(screen.getByTestId('Rating.EditButton'));
        expect(screen.getByTestId('Rating.Wrapper')).toHaveClass('className');
        expect(screen.getByTestId('Rating.FeedbackInput')).toHaveValue(
            'Your feedback',
        );
        expect(
            screen.getByTestId('Rating.SendFeedbackButton'),
        ).toHaveTextContent('Send feedback');
        expect(screen.getByTestId('Rating.FeedbackInput')).toHaveAttribute(
            'placeholder',
            'Enter your feedback',
        );
    });
});

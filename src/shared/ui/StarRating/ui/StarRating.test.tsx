import { StarRating } from './StarRating';
import { fireEvent, render, screen } from '@testing-library/react';
import classes from './StarRating.module.scss';

describe('StarRating.test', () => {
    it('should render', () => {
        render(<StarRating ratingRange={5} />);
        Array.from({ length: 5 }).forEach((_, i) => {
            expect(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            ).toBeInTheDocument();
        });
    });

    it('should call onChange callback', () => {
        const onChange = jest.fn();
        render(<StarRating onChange={onChange} ratingRange={5} />);
        fireEvent.click(screen.getByTestId('StarRating.StarButton.3'));
        expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should be disabled', () => {
        render(<StarRating disabled ratingRange={5} />);
        Array.from({ length: 5 }).forEach((_, i) => {
            expect(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            ).toBeDisabled();
        });
    });

    it('should display value', () => {
        render(<StarRating value={3} />);
        Array.from({ length: 3 }).forEach((_, i) => {
            expect(
                screen.getByTestId(`StarRating.StarButton.${i + 1}`),
            ).toHaveClass(classes.starButton_rated);
        });
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
    test('renders input with default text type', () => {
        render(<Input />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
    });

    test('renders input with specified type', () => {
        render(<Input type="email" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('type', 'email');
    });

    test('renders input with initial value', () => {
        const testValue = 'test value';
        render(<Input value={testValue} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveValue(testValue);
    });

    test('calls onChange handler when value changes', () => {
        const mockOnChange = jest.fn();
        render(<Input onChange={mockOnChange} />);
        const inputElement = screen.getByRole('textbox');

        const newValue = 'new value';
        fireEvent.change(inputElement, { target: { value: newValue } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(newValue);
    });

    test('applies className correctly', () => {
        const testClassName = 'test-class';
        render(<Input className={testClassName} />);
        const containerElement = screen.getByRole('textbox').closest('label');
        expect(containerElement).toHaveClass(testClassName);
    });

    test('passes through additional props', () => {
        render(<Input placeholder="test placeholder" disabled />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('placeholder', 'test placeholder');
        expect(inputElement).toBeDisabled();
    });

    describe('Password type', () => {
        test('renders password input with visibility toggle button', () => {
            render(<Input type="password" label="password" />);
            const inputElement = screen.getByLabelText('password');
            const buttonElement = screen.getByRole('button');

            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toHaveAttribute('type', 'password');
            expect(buttonElement).toBeInTheDocument();
        });

        test('toggles password visibility when button is clicked', () => {
            render(<Input type="password" label="password" />);
            const inputElement = screen.getByLabelText('password');
            const buttonElement = screen.getByRole('button');

            expect(inputElement).toHaveAttribute('type', 'password');

            fireEvent.click(buttonElement);
            expect(inputElement).toHaveAttribute('type', 'text');

            fireEvent.click(buttonElement);
            expect(inputElement).toHaveAttribute('type', 'password');
        });
    });

    describe('Non-password types', () => {
        test('does not render visibility toggle button for text type', () => {
            render(<Input type="text" />);
            const buttons = screen.queryByRole('button');
            expect(buttons).not.toBeInTheDocument();
        });
    });
});

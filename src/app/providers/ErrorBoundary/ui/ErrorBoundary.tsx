import { CatchedError } from '#/widgets/CatchedError/ui/CatchedError';
import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | undefined;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.debug(error, info);
        this.setState({ error });
    }

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;
        if (hasError && error) {
            return <CatchedError error={error} />;
        }

        return children;
    }
}

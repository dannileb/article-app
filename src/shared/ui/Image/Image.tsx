import React, { ReactNode, useLayoutEffect, useState } from 'react';
import imagePlaceholder from '#/shared/assets/images/imagePlaceholder.webp';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: ReactNode;
    loadingFallback?: ReactNode;
}

export const AppImage = ({
    fallback = imagePlaceholder,
    loadingFallback,
    src,
    ...props
}: ImageProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return loadingFallback;
    }

    if (hasError) {
        return typeof fallback === 'string' ? (
            <img {...props} src={fallback} />
        ) : (
            fallback
        );
    }

    return <img {...props} src={src} />;
};

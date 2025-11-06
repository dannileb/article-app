import React from 'react';
import imagePlaceholder from '#/shared/assets/images/imagePlaceholder.webp';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

export const Image = ({ fallback, ...props }: ImageProps) => {
    return (
        <img
            {...props}
            onError={(e) => {
                e.currentTarget.src = fallback ?? imagePlaceholder;
                e.currentTarget.onerror = null;
            }}
        />
    );
};

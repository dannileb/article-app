import classNames from 'classnames';
import classes from './Avatar.module.scss';
import avatarPlaceholder from '#/shared/assets/images/avatarPlaceholder.webp';
import { AppImage } from '#/shared/ui/Image/Image';

interface AvatarProps {
    size?: number | string;
    src?: string;
    alt: string;
    className?: string;
}

export const Avatar = ({ size = 100, src, alt, className }: AvatarProps) => {
    return (
        <div
            className={classNames(classes.avatarWrapper, className)}
            style={{
                width: size,
                height: size,
            }}
        >
            <AppImage
                className={classes.avatar}
                src={src ?? avatarPlaceholder}
                alt={alt}
                fallback={avatarPlaceholder}
            />
        </div>
    );
};

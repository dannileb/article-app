import { Loader } from '#/shared/ui/Loader/Loader';
import classNames from 'classnames';
import classes from './PageLoader.module.scss';

interface PageLoaderProps {
    show?: boolean;
    fullscreen?: boolean;
}

export const PageLoader = ({ fullscreen, show = true }: PageLoaderProps) => {
    return (
        <div
            className={classNames(classes.wrapper, {
                [classes.show]: show,
                [classes.fullscreen]: fullscreen,
            })}
        >
            <div className={classes.loader}>
                <Loader color="var(--bg-color)" />
            </div>
        </div>
    );
};

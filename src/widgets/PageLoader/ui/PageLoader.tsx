import { Loader } from '#/shared/ui/Loader/Loader';
import classNames from 'classnames';
import classes from './PageLoader.module.scss';
import { Transition } from 'react-transition-group';
import { useRef } from 'react';

interface PageLoaderProps {
    show?: boolean;
    fullscreen?: boolean;
    timeout?: number;
    view?: 'primary' | 'secondary';
}

export const PageLoader = ({
    fullscreen,
    show = true,
    timeout = 200,
    view = 'primary',
}: PageLoaderProps) => {
    const loaderRef = useRef<HTMLDivElement>(null);

    return (
        <Transition
            in={show}
            unmountOnExit
            nodeRef={loaderRef}
            timeout={timeout}
        >
            {(state) => (
                <div
                    ref={loaderRef}
                    className={classNames(
                        classes.wrapper,
                        classes[state],
                        classes[view],
                        {
                            [classes.fullscreen]: fullscreen,
                        },
                    )}
                >
                    <div className={classes.loader}>
                        <Loader />
                    </div>
                </div>
            )}
        </Transition>
    );
};

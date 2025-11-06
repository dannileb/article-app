import { Loader } from '#/shared/ui/Loader/Loader';
import classNames from 'classnames';
import classes from './PageLoader.module.scss';
import { Transition } from 'react-transition-group';
import { useCallback, useRef } from 'react';
import { Button } from '#/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface PageLoaderProps {
    show?: boolean;
    fullscreen?: boolean;
    timeout?: number;
    view?: 'primary' | 'secondary';
    withReloadButton?: boolean;
}

export const PageLoader = ({
    fullscreen,
    show = true,
    timeout = 200,
    view = 'primary',
    withReloadButton = false,
}: PageLoaderProps) => {
    const { t } = useTranslation();
    const loaderRef = useRef<HTMLDivElement>(null);

    const handeReload = useCallback(() => {
        window.location.reload();
    }, []);

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
                    {withReloadButton && (
                        <Button
                            className={classes.reloadButton}
                            onClick={handeReload}
                        >
                            {t('reloadBtnText')}
                        </Button>
                    )}
                </div>
            )}
        </Transition>
    );
};

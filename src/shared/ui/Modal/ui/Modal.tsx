import { Transition } from 'react-transition-group';
import classes from './Modal.module.scss';
import { useRef } from 'react';
import classNames from 'classnames';
import { PortalWithTheme } from '#/shared/ui/PortalWithTheme/ui/PortalWithTheme';
import { useTheme } from '#/shared/lib/hooks/useTheme';

interface ModalProps {
    isOpen: boolean;
    onClickOutside?: (e: React.MouseEvent) => void;
}

export const Modal = ({
    isOpen,
    onClickOutside,
    children,
}: React.PropsWithChildren<ModalProps>) => {
    const { theme } = useTheme();
    const portalRef = useRef<HTMLDivElement | null>(null);

    return (
        <Transition in={isOpen} unmountOnExit nodeRef={portalRef} timeout={200}>
            {(state) => (
                <PortalWithTheme
                    ref={portalRef}
                    theme={theme}
                    className={classNames(classes.modal, classes[state])}
                >
                    <div
                        className={classes.overlay}
                        onClick={(e) => {
                            onClickOutside(e);
                        }}
                    />
                    <div className={classes.content}>{children}</div>
                </PortalWithTheme>
            )}
        </Transition>
    );
};

import { Modal, ModalProps } from '#/shared/ui/Modal';
import { Suspense } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.acyns';
import { Loader } from '#/shared/ui/Loader/Loader';

interface LoginModalProps extends ModalProps {
    onLogin: () => void;
}

export const LoginModal = ({
    isOpen,
    onClickOutside,
    onLogin,
}: LoginModalProps) => {
    return (
        <Modal isOpen={isOpen} onClickOutside={onClickOutside}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onLogin={onLogin} />
            </Suspense>
        </Modal>
    );
};

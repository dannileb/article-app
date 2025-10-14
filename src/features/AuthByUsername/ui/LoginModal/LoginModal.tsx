import { LoginForm } from '../LoginForm/LoginForm';
import { Modal, ModalProps } from '#/shared/ui/Modal';

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
            <LoginForm onLogin={onLogin} />
        </Modal>
    );
};

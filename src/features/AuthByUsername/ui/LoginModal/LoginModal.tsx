import { LoginForm } from '../LoginForm/LoginForm';
import { Modal, ModalProps } from '#/shared/ui/Modal';

export const LoginModal = ({ isOpen, onClickOutside }: ModalProps) => {
    return (
        <Modal isOpen={isOpen} onClickOutside={onClickOutside}>
            <LoginForm />
        </Modal>
    );
};

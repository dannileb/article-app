import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Modal, ModalProps } from '#/shared/ui/Modal';
import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';

interface ProfileModalProps
    extends Pick<ModalProps, 'isOpen' | 'onClickOutside'> {
    profileId: string | undefined;
}

export const ProfileModal = ({
    isOpen,
    onClickOutside,
    profileId,
}: ProfileModalProps) => {
    const { t } = useTranslation('profile');
    return (
        <Modal isOpen={isOpen} onClickOutside={onClickOutside}>
            <ProfileCard profileId={profileId} />
            <AppLink
                to={
                    profileId !== undefined
                        ? generatePath(RoutePath.profile, { profileId })
                        : ''
                }
            >
                {t('goToProfilePage')}
            </AppLink>
        </Modal>
    );
};

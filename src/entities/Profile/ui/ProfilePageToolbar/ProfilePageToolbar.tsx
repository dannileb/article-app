import { Button } from '#/shared/ui/Button/Button';
import { EditOutlined } from '@ant-design/icons';
import classes from './ProfilePageToolbar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getProfileIsUpdateLoading } from '../../model/selectors';

interface ProfilePageHeaderProps {
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
}

export const ProfilePageToolbar = ({
    onEdit,
    onCancelEdit,
    onSaveEdit,
    isEditing,
}: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');
    const isLoading = useAppSelector(getProfileIsUpdateLoading);

    return (
        <div className={classes.toolbar}>
            {isEditing ? (
                <>
                    <Button
                        onClick={onCancelEdit}
                        disabled={isLoading}
                        view="secondary"
                        data-testid="ProfilePageToolbar.CancelEditButton"
                    >
                        {t('cancelEdit')}
                    </Button>
                    <Button
                        onClick={onSaveEdit}
                        isLoading={isLoading}
                        data-testid="ProfilePageToolbar.SaveEditButton"
                    >
                        {t('saveEdit')}
                    </Button>
                </>
            ) : (
                <Button
                    icon={<EditOutlined />}
                    onClick={onEdit}
                    data-testid="ProfilePageToolbar.EditButton"
                >
                    {t('editButton')}
                </Button>
            )}
        </div>
    );
};

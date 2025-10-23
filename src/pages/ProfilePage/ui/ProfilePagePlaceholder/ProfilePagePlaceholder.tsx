import { Text } from '#/shared/ui/Text/Text';
import { FileExcelOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import classes from '../ProfilePage.module.scss';
import classNames from 'classnames';

interface ProfilePagePlaceholderProps {
    i18nErrorKey?: string;
}

export const ProfilePagePlaceholder = ({
    i18nErrorKey,
}: ProfilePagePlaceholderProps) => {
    const { t } = useTranslation('profile');
    const { t: tError } = useTranslation();
    return (
        <div className={classes.placeholder}>
            {i18nErrorKey ? (
                <>
                    <FileExcelOutlined
                        className={classNames(classes.icon, classes.icon_error)}
                    />
                    <Text view="error">{tError(i18nErrorKey)}</Text>
                </>
            ) : (
                <>
                    <UserOutlined className={classes.icon} />
                    <Text>{t('notFound')}</Text>
                </>
            )}
        </div>
    );
};

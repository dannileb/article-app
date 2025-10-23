import { getProfileForm, getProfileUpdateError } from '../../model/selectors';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import classes from '../ProfilePage.module.scss';
import { useProfileEditor } from './useProfileEditor';
import { Text } from '#/shared/ui/Text/Text';
import { DndInput } from '#/shared/ui/DnDInput/DndInput';
import { UserOutlined } from '@ant-design/icons';

export const ProfileEditor = () => {
    const { t } = useTranslation('profile');
    const { t: tError } = useTranslation();
    const form = useAppSelector(getProfileForm);
    const error = useAppSelector(getProfileUpdateError);

    const {
        handleChangeAge,
        handleChangeCity,
        handleChangeCountry,
        handleChangeCurrency,
        handleChangePhoto,
        handleChangeName,
        handleChangeSurname,
        handleChangeUsername,
    } = useProfileEditor();

    return (
        <form className={classes.card}>
            <div className={classes.info}>
                <div className={classes.nameWrapper}>
                    <Input
                        label={t('name')}
                        value={form?.name ?? ''}
                        onChange={handleChangeName}
                    />
                    <Input
                        label={t('surname')}
                        value={form?.surname ?? ''}
                        onChange={handleChangeSurname}
                    />
                </div>
                <div>
                    <Input
                        label={t('username')}
                        value={form?.username ?? ''}
                        onChange={handleChangeUsername}
                    />
                    <Text view="secondary">{t('username_alert')}</Text>
                </div>
                <div className={classes.nameWrapper}>
                    <Input
                        label={t('country')}
                        value={form?.country ?? ''}
                        onChange={handleChangeCountry}
                    />
                    <Input
                        label={t('city')}
                        value={form?.city ?? ''}
                        onChange={handleChangeCity}
                    />
                </div>
                <Input
                    label={t('age')}
                    value={form?.age.toString() ?? ''}
                    type="number"
                    min={16}
                    max={90}
                    onChange={handleChangeAge}
                />
                <Input
                    label={t('currency')}
                    value={form?.currency}
                    onChange={handleChangeCurrency}
                />
                {error && <Text view="error">{tError(error)}</Text>}
            </div>
            <div className={classes.updatePhotoContainer}>
                <Input
                    label={t('image')}
                    value={form?.photo}
                    onChange={handleChangePhoto}
                />
                <DndInput accept="image/*">
                    <div className={classes.updatePhotoWrapper}>
                        <UserOutlined className={classes.updatePhotoIcon} />
                        <Text align="center">{t('update_photo')}</Text>
                    </div>
                </DndInput>
                <Text view="secondary">{t('image_alert')}</Text>
            </div>
        </form>
    );
};

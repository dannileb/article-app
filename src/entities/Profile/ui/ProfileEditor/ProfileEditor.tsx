import { getProfileForm, getProfileUpdateError } from '../../model/selectors';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { Input } from '#/shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import classes from './ProfileEditor.module.scss';
import { useProfileEditor } from './useProfileEditor';
import { Text } from '#/shared/ui/Text/Text';
import { DndInput } from '#/shared/ui/DnDInput/DndInput';
import { UserOutlined } from '@ant-design/icons';

export const ProfileEditor = () => {
    const { t: tError } = useTranslation('errors');
    const { t } = useTranslation('profile');
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
        <form
            className={classes.card}
            onSubmit={(e) => {
                e.preventDefault();
                return;
            }}
        >
            <div className={classes.info}>
                <div className={classes.nameWrapper}>
                    <Input
                        label={t('name')}
                        value={form?.name ?? ''}
                        onChange={handleChangeName}
                        data-testid="ProfileEditor.NameInput"
                    />
                    <Input
                        label={t('surname')}
                        value={form?.surname ?? ''}
                        onChange={handleChangeSurname}
                        data-testid="ProfileEditor.SurnameInput"
                    />
                </div>
                <div>
                    <Input
                        label={t('username')}
                        value={form?.username ?? ''}
                        onChange={handleChangeUsername}
                        data-testid="ProfileEditor.UsernameInput"
                    />
                    <Text view="secondary">{t('username_alert')}</Text>
                </div>
                <div className={classes.nameWrapper}>
                    <Input
                        label={t('country')}
                        value={form?.country ?? ''}
                        onChange={handleChangeCountry}
                        data-testid="ProfileEditor.CountryInput"
                    />
                    <Input
                        label={t('city')}
                        value={form?.city ?? ''}
                        onChange={handleChangeCity}
                        data-testid="ProfileEditor.CityInput"
                    />
                </div>
                <Input
                    label={t('age')}
                    value={form?.age.toString() ?? ''}
                    type="number"
                    min={16}
                    max={90}
                    onChange={handleChangeAge}
                    data-testid="ProfileEditor.AgeInput"
                />
                <Input
                    label={t('currency')}
                    value={form?.currency}
                    onChange={handleChangeCurrency}
                    data-testid="ProfileEditor.CurrencyInput"
                />
                {error && <Text view="error">{tError(error)}</Text>}
            </div>
            <div className={classes.updatePhotoContainer}>
                <Input
                    label={t('image')}
                    value={form?.photo}
                    onChange={handleChangePhoto}
                    data-testid="ProfileEditor.PhotoInput"
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

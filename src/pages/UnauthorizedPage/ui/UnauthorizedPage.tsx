import { useTranslation } from 'react-i18next';
import classes from './UnauthorizedPage.module.scss';

export default function UnauthorizedPage() {
    const { t } = useTranslation('errors');
    return <div className={classes.unauthorizedPage}>{t('unauthorized')}</div>;
}

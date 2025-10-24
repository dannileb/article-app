import { useTranslation } from 'react-i18next';
import classes from './NotFoundPage.module.scss';

export default function NotFoundPage() {
    const { t } = useTranslation('errors');
    return <div className={classes.notFoundPage}>{t('pageNotFound')}</div>;
}

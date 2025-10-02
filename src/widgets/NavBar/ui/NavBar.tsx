import classNames from 'classnames';
import classes from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
    const { t } = useTranslation();
    return (
        <div className={classNames(classes.navbar)}>
            <div className={classes.links}>{t('header_title')}</div>
        </div>
    );
};

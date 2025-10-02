import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import classes from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    shortened?: boolean;
}

export const LangSwitcher = ({ shortened }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button onClick={toggleLang} view="clear" className={classes.switcher}>
            {shortened ? t('langSwitcher_flag') : t('langSwitcher_text')}
        </Button>
    );
};

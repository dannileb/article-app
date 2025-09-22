import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation('main');
    return <div>{t('Главная')}</div>;
}

export default MainPage;

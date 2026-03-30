import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation('main');
    return (
        <div style={{ fontWeight: 'bold' }} data-testid="MainPage.Container">
            {t('Главная')}
        </div>
    );
}

export default MainPage;

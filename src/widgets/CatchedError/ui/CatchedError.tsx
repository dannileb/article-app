import { Button } from '#/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import classes from './CatchedError.module.scss';

interface CatchedErrorProps {
    error: Error;
}

export const CatchedError = ({ error }: CatchedErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        location.reload();
    };
    return (
        <div className={classes.catchedError}>
            <p>{t('catchedError_text')}</p>
            <p>{error.message}</p>
            <Button onClick={reloadPage}>{t('catchedError_btnText')}</Button>
        </div>
    );
};

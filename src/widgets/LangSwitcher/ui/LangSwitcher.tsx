import { useTranslation } from "react-i18next";
import classes from "./LangSwitcher.module.scss";
import { Button } from "#/shared/ui/Button/Button";

interface LangSwitcherProps {}

export const LangSwitcher = ({}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button onClick={toggleLang} view="clear">
      {t("langSwitcher")}
    </Button>
  );
};

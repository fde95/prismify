import { createI18n } from "vue-i18n";
import pt from "./locales/pt-BR.json";
import en from "./locales/en-US.json";
import es from "./locales/es-ES.json";

function getBrowserLocale() {
  const savedLocale = localStorage.getItem("preferred-language");
  if (savedLocale) {
    return savedLocale;
  }

  const navigatorLocale = navigator.languages?.[0] || navigator.language;
  if (!navigatorLocale) {
    return "pt-BR";
  }

  const locale = navigatorLocale.trim().split(/-|_/)[0];
  const localeMap = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  return localeMap[locale] || "pt-BR";
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: "pt-BR",
  messages: {
    "pt-BR": pt,
    "en-US": en,
    "es-ES": es,
  },
});

export default i18n;

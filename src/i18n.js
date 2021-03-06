import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector'; todo
import translation_en from "./locales/en/translation";
import translation_zh from "./locales/zh/translation";


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    //   .use(LanguageDetector)
    // .use(backend) figure out how to use backend!
    .init({
        resources:{
            en: {
                translation: translation_en
            },
            zh: {
                translation: translation_zh
            },
        },
        lng: "en",
        fallbackLng: 'en',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
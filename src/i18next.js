import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./language/english.json";
import da from "./language/danish.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },

    da: {
      translation: da,
    },
  },

  //   default language
  lng: localStorage.getItem("lng") || "da",
});

export default i18next;

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import { I18N_REDIRECTED } from './constants';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: true,
    supportedLngs: ['en', 'vi'],
    preload: ['en', 'vi'],
    detection: {
      order: ['cookie'],
      lookupCookie: I18N_REDIRECTED,
      caches: ['cookie'],
    },
    saveMissing: true,
    backend: {
      projectId: '95c523a9-73b8-45e6-9e1f-e4a6de20828d',
      apiKey: '29b32660-eab6-4e4a-b58c-f480c53fdf2d',
    },
  });

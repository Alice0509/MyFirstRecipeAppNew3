// app/i18n.js
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// 번역 JSON 파일 로드
import en from './locales/en.json';
import de from './locales/de.json';

// 번역 파일 연결
i18n.translations = {
  en,
  de,
};

// 기본 언어 설정
i18n.defaultLocale = 'en';
i18n.locale = Localization.locale || 'en';
i18n.fallbacks = true;

export default i18n;

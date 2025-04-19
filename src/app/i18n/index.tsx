'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';

type Locale = 'fr' | 'ar';
type Translations = typeof frTranslations;

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (locale: Locale) => void;
}

const translations: Record<Locale, Translations> = {
  fr: frTranslations,
  ar: arTranslations,
};

// Create the context with a default value
const I18nContext = createContext<I18nContextType>({
  locale: 'fr',
  t: (key: string) => key,
  changeLocale: () => {}
});

export const I18nProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    // Set document direction based on locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    
    // Store locale preference
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/app/providers";

// Language codes for the translation API
const LANG_MAP: Record<string, string> = {
  EN: "en",
  AR: "ar",
  KU: "ku",
};

// In-memory cache to avoid re-translating the same strings
const translationCache: Record<string, string> = {};

function getCacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text}`;
}

/**
 * Translate a single string using MyMemory free translation API.
 * Falls back to original text on error.
 */
async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === "en") return text;

  const cacheKey = getCacheKey(text, targetLang);
  if (translationCache[cacheKey]) return translationCache[cacheKey];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache[cacheKey] = translated;
      return translated;
    }
    return text;
  } catch {
    return text;
  }
}

/**
 * Translate multiple strings in a batch (sequentially to respect rate limits).
 */
async function translateBatch(
  texts: string[],
  targetLang: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  for (const text of texts) {
    results[text] = await translateText(text, targetLang);
  }

  return results;
}

/**
 * Hook: pass an object of key→englishText, get back translated versions.
 * 
 * Usage:
 * const t = useTranslation({
 *   greeting: "Good Morning",
 *   shopBtn: "Shop Collection",
 * });
 * // t.greeting → "صباح الخير" (when language is AR)
 */
export function useTranslation<T extends Record<string, string>>(
  strings: T
): T {
  const { language } = useLanguage();
  const targetLang = LANG_MAP[language] || "en";
  const [translated, setTranslated] = useState<T>(strings);
  const prevLangRef = useRef(targetLang);
  const prevStringsRef = useRef(JSON.stringify(strings));

  useEffect(() => {
    const stringsKey = JSON.stringify(strings);
    
    // Skip if nothing changed
    if (prevLangRef.current === targetLang && prevStringsRef.current === stringsKey) {
      return;
    }
    prevLangRef.current = targetLang;
    prevStringsRef.current = stringsKey;

    // If English, just return original
    if (targetLang === "en") {
      setTranslated(strings);
      return;
    }

    let cancelled = false;

    const doTranslate = async () => {
      const texts = Object.values(strings);
      const keys = Object.keys(strings);
      const results = await translateBatch(texts, targetLang);

      if (cancelled) return;

      const newTranslated = {} as Record<string, string>;
      keys.forEach((key, i) => {
        newTranslated[key] = results[texts[i]] || texts[i];
      });
      setTranslated(newTranslated as T);
    };

    doTranslate();
    return () => { cancelled = true; };
  }, [targetLang, strings]);

  return translated;
}

/**
 * Simple hook: translate a single string.
 * 
 * Usage:
 * const title = useT("My Profile");
 * // returns "ملفي الشخصي" when language is AR
 */
export function useT(text: string): string {
  const { language } = useLanguage();
  const targetLang = LANG_MAP[language] || "en";
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (targetLang === "en") {
      setTranslated(text);
      return;
    }

    let cancelled = false;
    translateText(text, targetLang).then((result) => {
      if (!cancelled) setTranslated(result);
    });
    return () => { cancelled = true; };
  }, [text, targetLang]);

  return translated;
}

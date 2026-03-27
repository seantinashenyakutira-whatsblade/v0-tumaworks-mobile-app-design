export type SupportedLanguage = 'English' | 'Bemba' | 'Nyanja' | 'Tonga' | 'Swahili';

export const TRANSLATIONS: { [key: string]: { [lang in SupportedLanguage]: string } } = {
  welcome: {
    English: 'Welcome to Tumaworks',
    Bemba: 'Mwaiseni ku Tumaworks',
    Nyanja: 'Takulandirani ku Tumaworks',
    Tonga: 'Mwabonwa ku Tumaworks',
    Swahili: 'Karibu Tumaworks'
  },
  post_job: {
    English: 'Post a Job',
    Bemba: 'Lembeni Inchito',
    Nyanja: 'Lembani Ntchito',
    Tonga: 'Lembani Milimo',
    Swahili: 'Tuma Kazi'
  },
  find_pros: {
    English: 'Find Pros Nearby',
    Bemba: 'Sanga Abaishiba Inchito',
    Nyanja: 'Peza Akatswiri Pafupi',
    Tonga: 'Yanda Bashibi Milimo',
    Swahili: 'Tafuta Wataalamu'
  },
  wallet: {
    English: 'Wallet',
    Bemba: 'Icihomboro',
    Nyanja: 'Chikwama',
    Tonga: 'Cikomboro',
    Swahili: 'Mkoba'
  }
};

export class TranslationService {
  static translate(key: string, lang: SupportedLanguage = 'English'): string {
    return TRANSLATIONS[key]?.[lang] || key;
  }

  // Hook for Google Translate API (Phase 15)
  static async translateText(text: string, targetLang: string): Promise<string> {
    // In production:
    // const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, { ... });
    // return res.data.translations[0].translatedText;
    
    console.log(`Simulating translation of "${text}" to ${targetLang}`);
    return text; // Placeholder
  }
}

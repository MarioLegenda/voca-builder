export interface IAddWordMetadata {
  title: string;
  placeholder: string;
  form: {
    placeholders: {
      addWord: string;
      translation: string;
      translationDesc: string;
    };
  };
  explanation: { addWord: string };
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SingleTranslation {
  word: string;
  desc: string;
}

export interface Word {
  id?: string;
  word: string;
  fromLanguage: string;
  toLanguage: string;
  translations: SingleTranslation[];
}

// only designed to make something a repository for ref hook containers
export interface Repository {}

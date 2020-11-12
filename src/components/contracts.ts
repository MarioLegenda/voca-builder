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
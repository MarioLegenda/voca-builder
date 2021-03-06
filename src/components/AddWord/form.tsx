import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import { saveWord } from '../../app/repository/wordRepository';
import NotEqual from '../../app/validation/constraints/NotEqual';
import Required from '../../app/validation/constraints/Required';
import ConstraintProcessor from '../../app/validation/ContraintProcessor';
import { LanguageOption, SelectOption, Word } from '../contracts';
import * as form from '../styles/form.styles';
import * as index from './index.styles';
import { lastTranslation } from './index.styles';
import { TextField } from './textField';
import { IFormTranslation, Translation } from './translation';

interface FormProps {
  countries: SelectOption[];
}

function createTranslationBlocks(
  initial: IFormTranslation[],
  onTranslationChange: (value: IFormTranslation) => void,
  onTranslationDelete: (id: number) => void,
): JSX.Element[] | JSX.Element {
  if (initial.length === 1) {
    return [<Translation allowDelete={false} key={initial[0].id} id={initial[0].id} onChange={onTranslationChange} onDelete={onTranslationDelete} />];
  }

  return initial.map((b) => <Translation allowDelete={true} onDelete={onTranslationDelete} onChange={onTranslationChange} key={b.id} id={b.id} />);
}

function isFormValid(word: string, fromLanguage: string, toLanguage: string, translations: IFormTranslation[]): boolean {
  const cp = new ConstraintProcessor([new Required()]);

  const valid = [word, fromLanguage, toLanguage].every((b) => cp.validate(b).length === 0);

  if (!valid) {
    return false;
  }

  if (fromLanguage === toLanguage) return false;

  return translations.some((t) => cp.validate(t.translation).length === 0);
}

function createWordModel(word: string, fromLanguage: string, toLanguage: string, translations: IFormTranslation[]): Word {
  return {
    translations: translations.map((t) => {
      return { word: t.translation, desc: t.desc };
    }),
    word: word,
    fromLanguage: fromLanguage,
    toLanguage: toLanguage,
  };
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const { countries } = props;

  const [saving, setSaving] = useState(false);
  const [word, setWord] = useState<string>('');
  const [toLanguage, setToLanguage] = useState<string>('');
  const [fromLanguage, setFromLanguage] = useState<string>('');
  const [translations, setTranslations] = useState<IFormTranslation[]>([
    {
      translation: '',
      desc: '',
      id: 0,
    },
  ]);
  const [translationBlocks, setTranslationBlocks] = useState<IFormTranslation[]>([
    {
      translation: '',
      desc: '',
      id: 0,
    },
  ]);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const counterRef = useRef<number>();

  useEffect(() => {
    counterRef.current = 0;
  }, []);

  const addBlock = () => {
    (counterRef.current as number) += 1;
    const idx: number = counterRef.current as number;

    {
      const t: IFormTranslation = { translation: '', desc: '', id: idx };
      const temp = [...translationBlocks];
      temp.push(t);
      setTranslationBlocks(temp);
    }

    {
      const t: IFormTranslation = { translation: '', desc: '', id: idx };
      const temp = [...translations];
      temp.push(t);
      setTranslations(temp);
    }
  };

  const onTextChange = (value: string) => {
    setWord(value);

    setFormValid(isFormValid(word, fromLanguage, toLanguage, translations));
  };

  const onFromLanguage = (value: LanguageOption) => {
    setFromLanguage(value.value);
    setFormValid(isFormValid(word, value.value, toLanguage, translations));

    setErrors(new ConstraintProcessor([new NotEqual(value.value)]).validate(toLanguage));
  };

  const onToLanguage = (value: LanguageOption) => {
    setToLanguage(value.value);
    setFormValid(isFormValid(word, fromLanguage, value.value, translations));

    setErrors(new ConstraintProcessor([new NotEqual(value.value)]).validate(fromLanguage));
  };

  const onTranslationChange = (value: IFormTranslation) => {
    const temp: IFormTranslation[] = [...translations];

    const idx: number = temp.findIndex((t) => t.id === value.id);

    temp[idx] = value;

    setTranslations(temp);
    setFormValid(isFormValid(word, fromLanguage, toLanguage, temp));
  };

  const onTranslationDelete = (id: number) => {
    {
      const temp = [...translations];
      const idx: number = translations.findIndex((t) => t.id === id);
      temp.splice(idx, 1);
      setTranslations([...temp]);
      setFormValid(isFormValid(word, fromLanguage, toLanguage, temp));
    }

    {
      const temp = [...translationBlocks];
      const idx: number = translationBlocks.findIndex((t) => t.id === id);
      temp.splice(idx, 1);
      setTranslationBlocks([...temp]);
    }
  };

  const onSaveWord = () => {
    setSaving(true);
    saveWord(createWordModel(word, fromLanguage, toLanguage, translations)).then(() => {
      setSaving(false);
    });
  };

  const selectStyles = {
    control: (base: CSSProperties) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

  const tBlocks: JSX.Element[] | JSX.Element = createTranslationBlocks(translationBlocks, onTranslationChange, onTranslationDelete);

  return (
    <div>
      <TextField onChange={onTextChange} />

      <div css={index.blockSeparator(5)} />

      <div css={index.twoRowGrid}>
        <Select onChange={(v) => onFromLanguage(v as LanguageOption)} options={countries} styles={selectStyles} placeholder="From language" />

        <Select onChange={(v) => onToLanguage(v as LanguageOption)} options={countries} styles={selectStyles} placeholder="To language" />
      </div>
      {errors.includes('equal') && <p css={form.error}>From and to languages cannot be the same language</p>}

      <div css={index.blockSeparator(15)} />

      <p css={index.explanation}>
        * You can have any number of translations you like, but one is mandatory. Translations that are blank will be skipped and not saved.
      </p>

      <div css={lastTranslation}>{tBlocks}</div>

      <button onClick={addBlock} css={[index.actionButton, index.primaryButton]}>
        Add
      </button>

      <button onClick={onSaveWord} disabled={!formValid || saving} css={form.saveButton}>
        SAVE
      </button>
    </div>
  );
};

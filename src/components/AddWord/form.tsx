import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import { SelectOption } from '../contracts';
import * as index from './index.styles';
import { TextField } from './textField';
import { ITranslation, Translation } from './translation';

interface FormProps {
  countries: SelectOption[];
  formMetadata: {
    addWordPlaceholder: string;
    translation: string;
    translationDesc: string;
  };
}

function createTranslationBlocks(
  initial: ITranslation[],
  translation: string,
  translationDesc: string,
  onTranslationChange: (value: ITranslation) => void,
  onTranslationDelete: (id: number) => void,
) {
  if (initial.length === 1) {
    return (
      <Translation
        allowDelete={false}
        translationPlaceholder={translation}
        translationDescPlaceholder={translationDesc}
        id={initial[0].id}
        onChange={onTranslationChange}
        onDelete={onTranslationDelete}
      />
    );
  }

  return initial.map((b) => (
    <Translation
      allowDelete={true}
      onDelete={onTranslationDelete}
      onChange={onTranslationChange}
      key={b.id}
      id={b.id}
      translationPlaceholder={translation}
      translationDescPlaceholder={translationDesc}
    />
  ));
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const { countries, formMetadata } = props;
  const { addWordPlaceholder, translation, translationDesc } = formMetadata;

  const [word, setWord] = useState<string>('');
  const [toLanguage, setToLanguage] = useState<string>('');
  const [fromLanguage, setFromLanguage] = useState<string>('');
  const [translations, setTranslations] = useState<ITranslation[]>([
    {
      translation: '',
      desc: '',
      id: 0,
    },
  ]);

  const counterRef = useRef<number>();

  useEffect(() => {
    counterRef.current = 0;
  }, []);

  const addBlock = () => {
    counterRef.current += 1;
    const idx: number = counterRef.current;
    const t: ITranslation = { translation: '', desc: '', id: idx };

    const temp = [...translations];

    temp.push(t);

    setTranslations(temp);
  };

  const onTextChange = (value: string) => {
    setWord(value);
  };

  const onLanguageChange = (value, type) => {
    if (type === 'fromLanguage') setFromLanguage(value);
    if (type === 'toLanguage') setToLanguage(value);
  };

  const onTranslationChange = (value: ITranslation) => {
    const temp: ITranslation[] = [...translations];

    temp[value.id] = value;

    setTranslations(temp);
  };

  const onTranslationDelete = (id: number) => {
    const temp = [...translations];

    const idx: number = translations.findIndex((t) => t.id === id);

    temp.splice(idx, 1);

    setTranslations([...temp]);
  };

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

  const tBlocks = createTranslationBlocks(
    translations,
    translation,
    translationDesc,
    onTranslationChange,
    onTranslationDelete,
  );

  return (
    <div>
      <TextField onChange={onTextChange} placeholder={addWordPlaceholder} />

      <div css={index.blockSeparator(5)} />

      <div css={index.twoRowGrid}>
        <Select
          onChange={(v) => onLanguageChange(v, 'fromLanguage')}
          options={countries}
          styles={selectStyles}
          placeholder="From language"
        />

        <Select
          onChange={(v) => onLanguageChange(v, 'toLanguage')}
          options={countries}
          styles={selectStyles}
          placeholder="To language"
        />
      </div>

      <div css={index.blockSeparator(15)} />

      <div>{tBlocks}</div>

      <button
        onClick={addBlock}
        css={[index.actionButton, index.primaryButton]}
      >
        Add
      </button>
    </div>
  );
};

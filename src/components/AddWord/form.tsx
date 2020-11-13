import React, { useState } from 'react';
import Select from 'react-select';

import { SelectOption } from '../contracts';
import * as index from './index.styles';
import { TextField } from './textField';
import { ITranslation, TranslationBlock } from './translation';

interface FormProps {
  countries: SelectOption[];
  formMetadata: {
    addWordPlaceholder: string;
    translation: string;
    translationDesc: string;
  };
}

function createTranslationBlocks(
  initial: number[],
  translation: string,
  translationDesc: string,
  onTranslationChange: (value: ITranslation) => void,
) {
  return initial.map((b, i) => (
    <TranslationBlock
      onChange={onTranslationChange}
      key={i}
      id={i}
      translationPlaceholder={translation}
      translationDescPlaceholder={translationDesc}
    />
  ));
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const { countries, formMetadata } = props;
  const { addWordPlaceholder, translation, translationDesc } = formMetadata;

  const [translationBlocks, setTranslationBlocks] = useState([0]);
  const [word, setWord] = useState<string>('');
  const [toLanguage, setToLanguage] = useState<string>('');
  const [fromLanguage, setFromLanguage] = useState<string>('');
  const [translations, setTranslations] = useState<ITranslation[]>([]);

  const addBlock = () => {
    translationBlocks.push(translationBlocks.length + 1);

    setTranslationBlocks(() => [...translationBlocks]);
  };

  const removeBlock = (idx: number) => {
    translationBlocks.splice(idx, 1);

    setTranslationBlocks(() => [...translationBlocks]);
    const temp = [...translations];
    temp.splice(idx, 1);

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

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

  const tBlocks = createTranslationBlocks(
    translationBlocks,
    translation,
    translationDesc,
    onTranslationChange,
  );

  console.log(word, fromLanguage, toLanguage, translations);

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

      {tBlocks.length > 1 && (
        <button
          onClick={removeBlock}
          css={[index.actionButton, index.removeButton]}
        >
          Remove
        </button>
      )}
    </div>
  );
};

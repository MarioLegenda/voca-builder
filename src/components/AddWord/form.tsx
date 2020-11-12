import React, { Dispatch, useState } from 'react';
import Select from 'react-select';

import { Country } from '../../app/http/model/Country';
import MinLength from '../../app/validation/constraints/MinLength';
import Required from '../../app/validation/constraints/Required';
import ConstraintProcessor from '../../app/validation/ContraintProcessor';
import { SelectOption } from '../contracts';
import * as form from '../styles/form.styles';
import * as index from './index.styles';

interface FormProps {
  countries: SelectOption[];
  formMetadata: {
    addWordPlaceholder: string;
    translation: string;
    translationDesc: string;
  };
}

interface TranslationBlockProps {
  translationPlaceholder: string;
  translationDescPlaceholder: string;
  id: number;
  onChange: (value: ITranslation) => void;
}

interface ITranslation {
  translation: string;
  desc: string;
  id: number;
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

const TranslationBlock: React.FC<TranslationBlockProps> = (
  props: TranslationBlockProps,
) => {
  const { translationPlaceholder, translationDescPlaceholder } = props;

  const [formValues, setFormValues] = useState<{
    translation: string;
    desc: string;
  }>({
    translation: '',
    desc: '',
  });

  const onChange = (type: string, value: string) => {
    const temp = { ...formValues };

    setFormValues(() => {
      temp[type] = value;

      return temp;
    });

    props.onChange({ ...temp, id: props.id } as ITranslation);
  };

  return (
    <div css={index.translation}>
      <input
        onChange={(e) => onChange('translation', e.target.value)}
        css={form.textField}
        type="text"
        placeholder={translationPlaceholder}
      />

      <div css={index.blockSeparator(2)} />

      <textarea
        onChange={(e) => onChange('translation', e.target.value)}
        css={form.textField}
        placeholder={translationDescPlaceholder}
      ></textarea>
    </div>
  );
};

const TextField: React.FC<{
  placeholder: string;
  onChange: (value: string) => void;
}> = (props: { placeholder: string; onChange: (value: string) => void }) => {
  const { placeholder } = props;

  const [errors, setErrors] = useState([]);

  const onChange = (value: string) => {
    const cp: ConstraintProcessor = new ConstraintProcessor();
    cp.add(new Required());

    const validated: string[] = cp.validate(value);

    if (validated.length > 0) {
      return setErrors(cp.validate(value as string[]));
    }

    props.onChange(value);
  };

  return (
    <>
      <input
        css={form.textField}
        name="addWord"
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
      />

      {errors.includes('required') && (
        <p css={form.error}>A word to translate is required</p>
      )}
    </>
  );
};

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

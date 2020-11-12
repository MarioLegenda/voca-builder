import React, { useState } from 'react';
import Select from 'react-select';

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
}

function createTranslationBlocks(
  initial: number[],
  translation: string,
  translationDesc: string,
) {
  return initial.map((b, i) => (
    <TranslationBlock
      key={i}
      translationPlaceholder={translation}
      translationDescPlaceholder={translationDesc}
    />
  ));
}

const TranslationBlock: React.FC<TranslationBlockProps> = (
  props: TranslationBlockProps,
) => {
  const { translationPlaceholder, translationDescPlaceholder } = props;

  return (
    <div css={index.translation}>
      <input
        css={form.textField}
        type="text"
        placeholder={translationPlaceholder}
      />

      <textarea
        css={form.textField}
        placeholder={translationDescPlaceholder}
      ></textarea>
    </div>
  );
};

export const Form: React.FC<FormProps> = (props: FormProps) => {
  const { countries, formMetadata } = props;
  const { addWordPlaceholder, translation, translationDesc } = formMetadata;

  const [translationBlocks, setTranslationBlocks] = useState([0]);

  const addBlock = () => {
    translationBlocks.push(translationBlocks.length + 1);

    setTranslationBlocks(() => [...translationBlocks]);
  };

  const removeBlock = (idx: number) => {
    translationBlocks.splice(idx, 1);

    setTranslationBlocks(() => [...translationBlocks]);
  };

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

  const tBlocks = createTranslationBlocks(
    translationBlocks,
    translation,
    translationDesc,
  );

  return (
    <div>
      <input
        css={form.textField}
        name="addWord"
        type="text"
        placeholder={addWordPlaceholder}
      />

      <div css={index.twoRowGrid}>
        <Select
          options={countries}
          styles={selectStyles}
          placeholder="From language"
        />

        <Select
          options={countries}
          styles={selectStyles}
          placeholder="To language"
        />
      </div>

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

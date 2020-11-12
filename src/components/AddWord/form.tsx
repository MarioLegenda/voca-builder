import React from 'react';
import Select from 'react-select';

import { SelectOption } from '../contracts';
import * as form from '../styles/form.styles';
import * as index from './index.styles';

interface Props {
  countries: SelectOption[];
  formMetadata: {
    addWordPlaceholder: string;
    translation: string;
    translationDesc: string;
  };
}

export const Form: React.FC<Props> = (props: Props) => {
  const { countries, formMetadata } = props;
  const { addWordPlaceholder, translation, translationDesc } = formMetadata;

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

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

      <div css={index.translationWrapper}>
        <input css={form.textField} type="text" placeholder={translation} />

        <textarea css={form.textField} placeholder={translationDesc}></textarea>
      </div>
    </div>
  );
};

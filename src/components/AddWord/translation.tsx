import React, { useState } from 'react';

import * as form from '../styles/form.styles';
import * as index from './index.styles';

export interface TranslationBlockProps {
  translationPlaceholder: string;
  translationDescPlaceholder: string;
  id: number;
  onChange: (value: ITranslation) => void;
}

export interface ITranslation {
  translation: string;
  desc: string;
  id: number;
}

export const TranslationBlock: React.FC<TranslationBlockProps> = (
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

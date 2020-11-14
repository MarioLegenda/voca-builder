import React, { useState } from 'react';

import * as form from '../styles/form.styles';
import * as index from './index.styles';

export interface TranslationBlockProps {
  translationPlaceholder: string;
  translationDescPlaceholder: string;
  id: number;
  allowDelete: boolean;
  onChange: (value: IFormTranslation) => void;
  onDelete: (id: number) => void;
}

export interface IFormTranslation {
  translation: string;
  desc: string;
  id: number;
}

export const Translation: React.FC<TranslationBlockProps> = (props: TranslationBlockProps) => {
  const { translationPlaceholder, translationDescPlaceholder, allowDelete } = props;

  const [formValues, setFormValues] = useState<{
    translation: string;
    desc: string;
  }>({
    translation: '',
    desc: '',
  });

  const onChange = (type: string, value: string) => {
    const temp = { ...formValues };
    temp[type] = value;

    setFormValues(temp);

    props.onChange({ ...temp, id: props.id } as IFormTranslation);
  };

  const onDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div css={index.translation}>
      <input onChange={(e) => onChange('translation', e.target.value)} css={form.textField} type="text" placeholder={translationPlaceholder} />

      <div css={index.blockSeparator(2)} />

      <textarea onChange={(e) => onChange('desc', e.target.value)} css={form.textField} placeholder={translationDescPlaceholder}></textarea>

      {allowDelete && (
        <button onClick={onDelete} css={[index.actionButton, index.removeButton]}>
          Remove
        </button>
      )}
    </div>
  );
};

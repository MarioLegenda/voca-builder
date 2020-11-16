import React, { useState } from 'react';

import Required from '../../app/validation/constraints/Required';
import ConstraintProcessor from '../../app/validation/ContraintProcessor';
import * as form from '../styles/form.styles';

export const TextField: React.FC<{
  onChange: (value: string) => void;
}> = (props: { placeholder: string; onChange: (value: string) => void }) => {
  const [errors, setErrors] = useState([]);

  const onChange = (value: string) => {
    const cp: ConstraintProcessor = new ConstraintProcessor();
    cp.add(new Required());

    setErrors(cp.validate(value));

    props.onChange(value);
  };

  return (
    <>
      <input css={form.textField} name="addWord" onChange={(e) => onChange(e.target.value)} type="text" placeholder="Your word" />

      {errors.includes('required') && <p css={form.error}>A word to translate is required</p>}
    </>
  );
};

import React from 'react';

type FormFieldProps = {
  name: string;
  placeholder: string;
  isTextArea?: boolean;
};

const FormField = ({ name, placeholder, isTextArea }: FormFieldProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={name}>{name}</label>

      {isTextArea ? (
        <textarea className='form_field-area' rows={7} name={name} placeholder={placeholder} />
      ) : (
        <input className='form_field-input' type='text' name={name} placeholder={placeholder} />
      )}
    </div>
  );
};

export default FormField;

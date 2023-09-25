import React from 'react';

type FormFieldProps = {
  name: string;
  placeholder: string;
  isTextArea?: boolean;
  onChange: (name: string, value: string) => void;
  required?: boolean;
};

const FormField = ({ name, placeholder, isTextArea, onChange, required }: FormFieldProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={name}>{name}</label>

      {isTextArea ? (
        <textarea
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
          className='form_field-area'
          rows={7}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <input
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
          className='form_field-input'
          type='text'
          name={name}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;

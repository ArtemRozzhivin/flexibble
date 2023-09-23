'use client';

import React from 'react';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@constants';
import Dropdown from './Dropdown';

const ProjectForm = () => {
  const [form, setForm] = React.useState({
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  });
  const handleSubmit = () => {};

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  return (
    <form onSubmit={handleSubmit} className='form flex flex-col gap-8'>
      <div className='form_image-container flexCenter'>
        <label className='form_image-label' htmlFor='image'>
          {!form.image ? (
            'Choose a poster for your project'
          ) : (
            <Image src={form.image} width={200} height={200} alt='Poster' />
          )}
        </label>
        <input
          onChange={handleFormChange}
          name='image'
          className='form_image-input'
          type='file'
          accept='image/*'
        />
      </div>

      <FormField name='Title' placeholder='Flexibble' />

      <FormField name='Description' placeholder='Flexibble' isTextArea={true} />

      <FormField name='Live Site Url' placeholder='https://flexibble.com' />

      <FormField name='Github Url' placeholder='https://github.com/ArtemRozzhivin/flexibble' />

      <div className='flexStart'>
        <Dropdown name='Category' list={categoryFilters} />
      </div>

      <div className='flexCenter gap-20'>
        <button className='form_cancel-btn' type='submit'>
          Cancel
        </button>

        <button className='form_submit-btn' type='submit'>
          Create
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;

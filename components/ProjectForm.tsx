'use client';

import React from 'react';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@constants';
import Dropdown from './Category';
import Button from './Button';

export type ProjectFormType = {
  image: string;
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

const ProjectForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState<ProjectFormType>({
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
    } catch (error) {}

    console.log(form);

    setIsSubmitting(false);
  };

  const handleChangeForm = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleChangeForm('image', result);
    };
  };

  return (
    <form onSubmit={handleSubmitForm} className='form flex flex-col gap-8'>
      <div className='form_image-container flexCenter'>
        <label className='form_image-label' htmlFor='image'>
          {!form.image ? (
            'Choose a poster for your project'
          ) : (
            <Image className='object-contain' src={form.image} fill={true} alt='Poster' />
          )}
        </label>
        <input
          onChange={handleLoadImage}
          name='image'
          className='form_image-input'
          type='file'
          accept='image/*'
          required
        />
      </div>

      <FormField onChange={handleChangeForm} name='title' placeholder='Flexibble' required />

      <FormField
        onChange={handleChangeForm}
        name='description'
        placeholder='Flexibble'
        isTextArea={true}
        required
      />

      <FormField
        onChange={handleChangeForm}
        name='liveSiteUrl'
        placeholder='https://flexibble.com'
        required
      />

      <FormField
        onChange={handleChangeForm}
        name='githubUrl'
        placeholder='https://github.com/ArtemRozzhivin/flexibble'
        required
      />

      <div className='flexStart'>
        <Dropdown
          value={form.category}
          onChange={(value) => handleChangeForm('category', value)}
          list={categoryFilters}
        />
      </div>

      <div className='flexCenter '>
        <Button pirmary leftIcon={isSubmitting ? '' : '/plus.svg'} type='submit'>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;

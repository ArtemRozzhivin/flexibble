'use client';

import React from 'react';
import Image from 'next/image';
import FormField from '../ui/FormField';
import { categoryFilters } from '@constants';
import Dropdown from '../ui/ListBox';
import Button from '../ui/Button';
import { createNewProject, editProject, fetchToken } from '@lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '@common.types';
import { useRouter } from 'next/navigation';
import { type } from 'os';

interface IProjectForm {
  session: SessionInterface;
  type: 'create' | 'edit';
  projectForm?: ProjectInterface;
}

const ProjectForm = ({ session, type, projectForm }: IProjectForm) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState<FormState>({
    image: projectForm?.image || '',
    title: projectForm?.title || '',
    description: projectForm?.description || '',
    liveSiteUrl: projectForm?.liveSiteUrl || '',
    githubUrl: projectForm?.githubUrl || '',
    category: projectForm?.category || '',
  });

  console.log('FORM', form);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const token = await fetchToken();
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);
      } else {
        await editProject(form, projectForm?.id as string, token);
      }

      router.push('/');
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
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
          // value={form.image}
          onChange={handleLoadImage}
          name='image'
          className='form_image-input'
          type='file'
          accept='image/*'
          required
        />
      </div>

      <FormField
        value={form.title}
        onChange={handleChangeForm}
        name='title'
        placeholder='Flexibble'
        required
        lable='Title'
      />

      <FormField
        value={form.description}
        onChange={handleChangeForm}
        name='description'
        placeholder='Flexibble'
        isTextArea={true}
        required
        lable='Description'
      />

      <FormField
        value={form.liveSiteUrl}
        onChange={handleChangeForm}
        name='liveSiteUrl'
        placeholder='https://flexibble.com'
        required
        lable='Site URL'
      />

      <FormField
        value={form.githubUrl}
        onChange={handleChangeForm}
        name='githubUrl'
        placeholder='https://github.com/ArtemRozzhivin/flexibble'
        required
        lable='GitHub URL'
      />

      <div className='flexStart'>
        <Dropdown
          value={form.category}
          onChange={(value) => handleChangeForm('category', value)}
          list={categoryFilters}
        />
      </div>

      <div className='flexCenter '>
        <Button
          pirmary
          leftIcon={
            type === 'create'
              ? isSubmitting
                ? ''
                : '/plus.svg'
              : isSubmitting
              ? ''
              : '/pencile.svg'
          }
          type='submit'>
          {type === 'create'
            ? isSubmitting
              ? 'Creating...'
              : 'Create'
            : isSubmitting
            ? 'Editing...'
            : 'Edit'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;

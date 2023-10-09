'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from './Button';
import { deleteProject, fetchToken } from '@lib/actions';
import { useRouter } from 'next/navigation';

interface IProjectActions {
  projectId: string;
}

const ProjectActions = ({ projectId }: IProjectActions) => {
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      setDeleting(true);
      try {
        const token = await fetchToken();
        await deleteProject(projectId, token);
        router.push('/');
      } catch (error) {
        alert(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className='flexCenter gap-3'>
      <Link href={`/edit-project/${projectId}`}>
        <Button type='button' edit>
          <Image src='/pencile.svg' width={20} height={20} alt='edit' />
        </Button>
      </Link>
      <Button disabled={isDeleting} onClick={handleDeleteProject} type='button' remove>
        <Image src='/trash.svg' width={20} height={20} alt='delete' />
      </Button>
    </div>
  );
};

export default ProjectActions;

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Button from './Button';

interface IProjectActions {
  projectId: string;
}

const ProjectActions = ({ projectId }: IProjectActions) => {
  return (
    <div className='flexCenter gap-3'>
      <Link href={`/edit-project/${projectId}`}>
        <Button type='button' edit>
          <Image src='/pencile.svg' width={20} height={20} alt='edit' />
        </Button>
      </Link>
      <Button type='button' remove>
        <Image src='/trash.svg' width={20} height={20} alt='delete' />
      </Button>
    </div>
  );
};

export default ProjectActions;

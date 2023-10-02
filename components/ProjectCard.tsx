import { ProjectInterface } from '@common.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// interface IProjectCard {
//   title: string;
//   image: string;
//   category: string;
//   description: string;
//   githubUrl: string;
//   liveSiteUrl: string;
//   createdBy: { name: string; email: string };
//   createdAt: string;
//   updatedAt: string;
// }

const ProjectCard = ({
  id,
  title,
  image,
  category,
  description,
  githubUrl,
  liveSiteUrl,
  createdBy,
  createdAt,
  updatedAt,
}: ProjectInterface) => {
  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-lg'>
      <Link href={`/project/${id}`}>
        <Image
          src={image}
          width={414}
          height={314}
          className='w-full h-full object-cover rounded-2xl'
          alt='Project Image'
        />
      </Link>
    </div>
  );
};

export default ProjectCard;

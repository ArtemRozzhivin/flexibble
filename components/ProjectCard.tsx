'use client';

import { ProjectInterface } from '@common.types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'));
  }, []);

  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-lg'>
      <Link className='flexCenter group relative w-full h-full' href={`/project/${id}`}>
        <Image
          src={image}
          width={414}
          height={314}
          className='w-full h-full object-cover rounded-2xl'
          alt='Project Image'
        />

        <div className='hidden group-hover:flex profile_card-title'>
          <p className='w-full'>{title}</p>
        </div>
      </Link>

      <div className='flexBetween px-2 mt-3 w-full font-semibold text-sm'>
        <Link href={`/profile/${createdBy?.id}`}>
          <div className='flexCenter gap-2'>
            <Image
              className='rounded-full'
              src={createdBy?.avatarUrl}
              width={35}
              height={35}
              alt='Avtor Image'
            />
            <span>{createdBy?.name}</span>
          </div>
        </Link>

        <div className='flexBetween gap-5'>
          <div className='flexCenter gap-2'>
            <Image
              className='rounded-full'
              src='/hearth.svg'
              width={20}
              height={20}
              alt='Like Image'
            />
            <span>{randomLikes}</span>
          </div>
          <div className='flexCenter gap-2'>
            <Image
              className='rounded-full'
              src='/eye.svg'
              width={20}
              height={20}
              alt='Views Image'
            />
            <span>{randomViews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

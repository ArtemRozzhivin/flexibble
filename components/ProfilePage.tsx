'use client';

import { ProjectInterface, UserProfile } from '@common.types';
import { User } from 'next-auth';
import React from 'react';
import Button from './Button';
import Image from 'next/image';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

interface IProfilePage {
  user: UserProfile;
}

const ProfilePage = ({ user }: IProfilePage) => {
  console.log(user?.projects?.edges);
  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className='flexBetween max-lg:flex-col gap-10 w-full'>
        <div className='flex items-start flex-col w-full'>
          <Image
            src={user?.avatarUrl}
            width={100}
            height={100}
            className='rounded-full'
            alt='user image'
          />
          <p className='text-4xl font-bold mt-10'>{user?.name}</p>
          <p className='md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg'>
            I’m Software Engineer at JSM 👋
          </p>

          <div className='flex mt-8 gap-5 w-full flex-wrap'>
            <Button type='button' leftIcon='/plus.svg' pirmary>
              Follow
            </Button>
            <Link href={`mailto:${user?.email}`}>
              <Button type='button' pirmary leftIcon='/email.svg'>
                Hire Me
              </Button>
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt='project image'
            width={739}
            height={554}
            className='rounded-xl object-contain'
          />
        ) : (
          <Image
            src='/profile-post.png'
            width={739}
            height={554}
            alt='project image'
            className='rounded-xl'
          />
        )}
      </section>

      <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
        <p className='w-full text-left text-lg font-semibold'>Recent Work</p>

        <div className='profile_projects'>
          {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={`${node?.id}`}
              {...node}
              createdBy={{
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                id: user.id,
              }}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;

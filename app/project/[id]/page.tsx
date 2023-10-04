import { ProjectInterface } from '@common.types';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { fetchProjectDetailsById } from '@lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type ProjectDetails = {
  project: ProjectInterface;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { project } = (await fetchProjectDetailsById(params.id)) as ProjectDetails;

  console.log(project);

  return (
    <div className='mt-20'>
      <Modal>
        <section className='w-full flexStart'>
          <div className='flexCenter gap-5'>
            <Image
              className='rounded-full'
              width={65}
              height={65}
              src={project.createdBy?.avatarUrl}
              alt='User'
            />
            <div className='flex justify-center items-start flex-col gap-2'>
              <p className='text-2xl font-bold'>{project.title}</p>
              <p className='text-sm font-semibold text-gray-500 flexBetween gap-2'>
                <p>{project.createdBy?.name}</p>
                <Image width={10} height={10} src='/dot.svg' alt='Dot' />
                <p className='text-purple-600'>{project.category}</p>
              </p>
            </div>
          </div>
        </section>

        <section className='mt-14'>
          <Image
            className='object-cover rounded-2xl'
            src={project.image}
            width={1064}
            height={798}
            alt='Project Image'
          />
        </section>

        <section className='flexCenter flex-col gap-5 text-center mt-14'>
          <p className=''>{project.description}</p>
          <div className='w-full h-[2px] bg-slate-300'></div>
          <div className='text-lg font-semibold text-gray-500 flexBetween gap-10'>
            <Link className='flexCenter gap-2' href={project.githubUrl}>
              <Button type='button' pirmary>
                <Image src='/github.svg' width={25} height={25} alt='gitHub' />
                <p>GitHub</p>
              </Button>
            </Link>
            <Image width={10} height={10} src='/dot.svg' alt='Dot' />
            <Link className='flexCenter gap-2' href={project.liveSiteUrl}>
              <Button type='button' pirmary>
                <Image src='/live.svg' width={25} height={25} alt='live' />
                <p>Live Site</p>
              </Button>
            </Link>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default ProjectPage;

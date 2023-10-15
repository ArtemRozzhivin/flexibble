import { ProjectInterface } from '@common.types';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import ProjectActions from '@components/project/ProjectActions';
import RelatedProjects from '@components/project/RelatedProjects';
import { fetchProjectDetailsById } from '@lib/actions';
import { getCurrentSession } from '@lib/nextAuthOptions';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type ProjectDetails = {
  project: ProjectInterface;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { project } = (await fetchProjectDetailsById(params.id)) as ProjectDetails;
  const session = await getCurrentSession();

  const isOwner = session.user.id === project.createdBy?.id;

  return (
    <div className='mt-20'>
      <Modal>
        <section className='w-full flexBetween'>
          <div className='flexCenter gap-5'>
            <Link href={`/profile/${project.createdBy?.id}`}>
              <Image
                className='rounded-full'
                width={65}
                height={65}
                src={project.createdBy?.avatarUrl}
                alt='User'
              />
            </Link>
            <div className='flex justify-center items-start flex-col gap-2'>
              <p className='text-2xl font-bold'>{project.title}</p>
              <p className='text-sm font-semibold text-gray-500 flexBetween gap-2'>
                <p>{project.createdBy?.name}</p>
                <Image width={10} height={10} src='/dot.svg' alt='Dot' />
                <Link href={`/?category=${project.category}`} className='text-purple-600'>
                  {project.category}
                </Link>
              </p>
            </div>
          </div>
          {isOwner && <ProjectActions projectId={params.id} />}
        </section>

        <section className='mt-14'>
          <Image
            className='object-cover rounded-2xl'
            src={project.image}
            width={764}
            height={698}
            alt='Project Image'
          />
        </section>

        <section className='flexCenter flex-col gap-10 text-center mt-14'>
          <p className=''>{project.description}</p>
          <div className='text-lg font-semibold text-gray-500 flexBetween gap-3 flex-col sm:flex-row sm:gap-10'>
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

        <section className='flexBetween w-full gap-2 sm:gap-20 mt-20'>
          <span className='w-full h-[1px] bg-light-white-200'></span>
          <Image
            className='rounded-full'
            src={project.createdBy?.avatarUrl}
            width={90}
            height={90}
            alt='avatar'
          />
          <span className='w-full h-[1px] bg-light-white-200'></span>
        </section>

        <RelatedProjects userId={project.createdBy?.id} projectId={params.id} />
      </Modal>
    </div>
  );
};

export default ProjectPage;

import { ProjectInterface } from '@common.types';
import Button from '@components/Button';
import Modal from '@components/Modal';
import RelatedProjects from '@components/RelatedProjects';
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

  console.log(project);

  return (
    <div className='mt-20'>
      <Modal>
        <section className='w-full flexBetween'>
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
          {isOwner && (
            <div className='flexCenter gap-5'>
              <Link href={`/edit-project/${params.id}`}>
                <Button type='button' pirmary>
                  <Image src='/pencile.svg' width={20} height={20} alt='edit' />
                </Button>
              </Link>
              <Button type='button' remove>
                <Image src='/trash.svg' width={20} height={20} alt='delete' />
              </Button>
            </div>
          )}
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

        <section className='flexCenter flex-col gap-10 text-center mt-14'>
          <p className=''>{project.description}</p>
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

        <section className='flexBetween w-full gap-20 mt-20'>
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

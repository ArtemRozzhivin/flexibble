import { ProjectInterface } from '@common.types';
import Modal from '@components/Modal';
import ProjectForm from '@components/ProjectForm';
import { fetchProjectDetailsById } from '@lib/actions';
import { getCurrentSession } from '@lib/nextAuthOptions';
import React from 'react';

const EditProject = async ({ params }: { params: { id: string } }) => {
  const session = await getCurrentSession();
  const { project } = (await fetchProjectDetailsById(params.id)) as { project: ProjectInterface };

  console.log(project);

  return (
    <div className='mt-20'>
      {/* <Modal> */}
      <h3 className='text-5xl'>Editing project</h3>
      <ProjectForm type='edit' session={session} projectForm={project} />
      {/* </Modal> */}
    </div>
  );
};

export default EditProject;
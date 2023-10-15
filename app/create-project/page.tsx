import Modal from '@components/ui/Modal';
import ProjectForm from '@components/project/ProjectForm';
import { getCurrentSession } from '@lib/nextAuthOptions';
import React from 'react';

const CreateProject = async () => {
  const session = await getCurrentSession();

  return (
    <div className='mt-20'>
      {/* <Modal> */}
      <h3 className='modal-head-text'>What have you been working on?</h3>
      <ProjectForm type='create' session={session} />
      {/* </Modal> */}
    </div>
  );
};

export default CreateProject;

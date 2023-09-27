import Modal from '@components/Modal';
import ProjectForm from '@components/ProjectForm';
import { getCurrentSession } from '@lib/nextAuthOptions';
import React from 'react';

const CreateProject = async () => {
  const session = await getCurrentSession();

  return (
    <div className='mt-20'>
      {/* <Modal> */}
      <h3 className='modal-head-text'>What have you been working on?</h3>
      <ProjectForm session={session} />
      {/* </Modal> */}
    </div>
  );
};

export default CreateProject;

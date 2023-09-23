import Modal from '@components/Modal';
import ProjectForm from '@components/ProjectForm';
import React from 'react';

const CreateProject = () => {
  return (
    <div className='mt-20'>
      {/* <Modal> */}
      <h3 className='modal-head-text'>What have you been working on?</h3>
      <ProjectForm />
      {/* </Modal> */}
    </div>
  );
};

export default CreateProject;

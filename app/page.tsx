import ProjectList from '@components/ProjectList';
import { getCurrentSession } from '@lib/nextAuthOptions';
import React from 'react';

const Main = () => {
  return (
    <section className='flex flex-col gap-5 mt-16'>
      <h2>Category</h2>
      <ProjectList />
      <h2>Other load</h2>
    </section>
  );
};

export default Main;

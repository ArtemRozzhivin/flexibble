import Categories from '@components/Categories';
import ProjectList from '@components/ProjectList';
import { getCurrentSession } from '@lib/nextAuthOptions';
import React from 'react';

const Main = () => {
  return (
    <section className='flex flex-col gap-5 mt-16 paddings'>
      <Categories />
      <ProjectList />
      <h2>Other load</h2>
    </section>
  );
};

export default Main;

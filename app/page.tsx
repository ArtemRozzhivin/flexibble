import { ProjectInterface } from '@common.types';
import Categories from '@components/Categories';
import Pagination from '@components/Pagination';
import ProjectList from '@components/ProjectList';
import { fetchAllProjects } from '@lib/actions';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface IMain {
  params: {
    category: string;
    endCursor: string;
  };
}

export interface IProjectItem {
  node: ProjectInterface;
}

interface IFetchSearch {
  projectSearch: {
    edges: IProjectItem[];
    pageInfo: {
      endCursor: string;
      startCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

const Main = async ({ params: { category, endCursor } }: IMain) => {
  const fetchProjects = async () => {
    const data = (await fetchAllProjects(category)) as IFetchSearch;
    const result = data?.projectSearch;

    console.log('RESULT', result);
    return result;
  };

  const { edges, pageInfo } = await fetchProjects();

  return (
    <section className='flex flex-col gap-5 mt-16 paddings'>
      <Categories />
      <ProjectList projects={edges} />
      <Pagination />
    </section>
  );
};

export default Main;

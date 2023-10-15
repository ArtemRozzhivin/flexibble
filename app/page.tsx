import { ProjectInterface } from '@common.types';
import Categories from '@components/Categories';
import Pagination from '@components/ui/Pagination';
import ProjectList from '@components/project/ProjectList';
import { fetchAllProjects } from '@lib/actions';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface IMain {
  searchParams: {
    category: string;
    endcursor: string;
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

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Main = async ({ searchParams }: IMain) => {
  const fetchProjects = async () => {
    const data = (await fetchAllProjects(
      searchParams.category,
      searchParams.endcursor,
    )) as IFetchSearch;
    const result = data?.projectSearch;

    return result;
  };

  const { edges, pageInfo } = await fetchProjects();

  return (
    <section className='flex flex-col gap-5 mt-16 paddings'>
      <Categories />
      {edges.length === 0 ? (
        <h3 className='no-result-text text-center'>No projects found, go to create some first.</h3>
      ) : (
        <ProjectList projects={edges} />
      )}
      <Pagination {...pageInfo} />
    </section>
  );
};

export default Main;

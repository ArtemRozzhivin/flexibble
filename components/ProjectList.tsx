'use client';

import { fetchAllProjects } from '@lib/actions';
import React, { use, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectInterface } from '@common.types';

interface IProjectItem {
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

const ProjectList = () => {
  const [projectList, setProjectList] = React.useState<IProjectItem[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = (await fetchAllProjects()) as IFetchSearch;
      const result = data?.projectSearch?.edges || [];

      console.log('RESULT', result);
      setProjectList(result);
    };

    fetchProjects();
  }, []);

  return (
    <section className='projects-grid'>
      {projectList.map(({ node }) => (
        <ProjectCard key={node.id} {...node} />
      ))}
    </section>
  );
};

export default ProjectList;

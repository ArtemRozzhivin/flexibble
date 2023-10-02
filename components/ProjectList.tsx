'use client';

import { fetchAllProjects } from '@lib/actions';
import React, { use, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectInterface } from '@common.types';

interface IProjectItem {
  node: ProjectInterface;
}

// interface IFetchProject {
//   data: {
//     projectCollection: {
//       edges: IProjectItem[];
//     };
//   };
// }

interface IFetchSearch {
  data: {
    projectSearch: {
      edges: IProjectItem[];
      pageInfo: {
        endCursor: string;
        startCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  };
}

const ProjectList = () => {
  const [projectList, setProjectList] = React.useState<IProjectItem[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = (await fetchAllProjects()) as IFetchSearch;

      const result = response?.data?.projectSearch?.edges || [];

      console.log(result);
      //@ts-ignore
      setProjectList(result);
    };

    fetchProjects();
  }, []);

  return (
    <section className='projects-grid'>
      {projectList.map(({ node }) => (
        <ProjectCard {...node} />
      ))}
    </section>
  );
};

export default ProjectList;

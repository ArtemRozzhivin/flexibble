'use client';

import React, { use, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { IProjectItem } from '@app/page';

const ProjectList = ({ projects }: { projects: IProjectItem[] }) => {
  return (
    <section className='projects-grid'>
      {projects.map(({ node }) => (
        <ProjectCard key={node.id} {...node} />
      ))}
    </section>
  );
};

export default ProjectList;

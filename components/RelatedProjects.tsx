'use client';

import { getUserById } from '@lib/actions';
import React, { useEffect } from 'react';
import { ProjectInterface, UserProfile } from '@common.types';
import ProjectCard from './ProjectCard';

interface IRelatedProjects {
  userId: string;
}

interface IProjectItem {
  node: ProjectInterface;
}

const RelatedProjects = ({ userId }: IRelatedProjects) => {
  const [user, setUser] = React.useState<UserProfile>({} as UserProfile);
  const [projects, setProjects] = React.useState<IProjectItem[]>([]);

  const fetchUser = async () => {
    const { user } = (await getUserById(userId)) as { user: UserProfile };
    setUser(user);
    setProjects(user.projects.edges);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);
  console.log(projects);

  return (
    <section className='projects-grid'>
      {projects.map(({ node }) => (
        <ProjectCard key={node.id} {...node} createdBy={user} />
      ))}
    </section>
  );
};

export default RelatedProjects;

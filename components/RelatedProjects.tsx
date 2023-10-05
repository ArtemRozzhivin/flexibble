'use client';

import { getUserById } from '@lib/actions';
import React, { useEffect } from 'react';
import { ProjectInterface, UserProfile } from '@common.types';
import ProjectCard from './ProjectCard';
import Button from './Button';

interface IRelatedProjects {
  projectId: string;
  userId: string;
}

interface IProjectItem {
  node: ProjectInterface;
}

const RelatedProjects = ({ userId, projectId }: IRelatedProjects) => {
  const [user, setUser] = React.useState<UserProfile>({} as UserProfile);
  const [projects, setProjects] = React.useState<IProjectItem[]>([]);

  const fetchUser = async () => {
    const { user } = (await getUserById(userId)) as { user: UserProfile };
    setUser(user);

    const filteredProjects = user.projects.edges.filter((project) => project.node.id !== projectId);

    setProjects(filteredProjects);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);
  console.log(projects);

  return (
    <section className='flex flex-col gap-10 w-full mt-20'>
      <div className='flexBetween'>
        <p>
          More by <span className='text-purple-600 text-lg'>{user.name}</span>
        </p>

        <Button type='button' border>
          View all
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className='text-2xl text-center mt-10'>No related projects</p>
      ) : (
        <section className='projects-grid'>
          {projects.map(({ node }) => (
            <ProjectCard key={node.id} {...node} createdBy={user} />
          ))}
        </section>
      )}
    </section>
  );
};

export default RelatedProjects;

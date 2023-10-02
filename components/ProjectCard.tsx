import { ProjectInterface } from '@common.types';
import React from 'react';

// interface IProjectCard {
//   title: string;
//   image: string;
//   category: string;
//   description: string;
//   githubUrl: string;
//   liveSiteUrl: string;
//   createdBy: { name: string; email: string };
//   createdAt: string;
//   updatedAt: string;
// }

const ProjectCard = ({
  title,
  image,
  category,
  description,
  githubUrl,
  liveSiteUrl,
  createdBy,
  createdAt,
  updatedAt,
}: ProjectInterface) => {
  return <div className='flexCenter flex-col rounded-2xl drop-shadow-2xl'>ProjectCard</div>;
};

export default ProjectCard;

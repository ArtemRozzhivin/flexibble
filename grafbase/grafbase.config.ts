import { g, auth, config } from '@grafbase/sdk';

const User = g.model('User', {
  name: g.string().length({ min: 3, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  gitHubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g
    .relation(() => Project)
    .list()
    .optional(),
});

const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  gitHubUrl: g.url(),
  liveSiteUrl: g.url(),
  category: g.string().search(),
  image: g.url(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});

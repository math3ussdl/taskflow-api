import { GraphQLBuilder } from '../builder';

export const UserProjectsRef = GraphQLBuilder.instance.drizzleObject(
  'userProjects',
  {
    name: 'UserProject',
    fields: t => ({
      user: t.relation('user'),
      role: t.relation('role'),
    }),
  }
);

import { GraphQLBuilder } from '../builder';

export const ProjectRef = GraphQLBuilder.instance.drizzleObject('projects', {
  name: 'Project',
  select: {
    with: {
      usersProjects: {
        with: {
          user: true,
          role: true,
        },
      },
    },
  },
  fields: t => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
    usersProjects: t.relation('usersProjects'),
  }),
});

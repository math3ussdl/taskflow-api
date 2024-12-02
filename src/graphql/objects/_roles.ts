import { GraphQLBuilder } from '../builder';

export const RoleRef = GraphQLBuilder.instance.drizzleObject('roles', {
  name: 'Role',
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
  }),
});

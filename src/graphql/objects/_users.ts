import { GraphQLBuilder } from '../builder';

export const UserRef = GraphQLBuilder.instance.drizzleObject('users', {
  name: 'User',
  fields: t => ({
    id: t.exposeString('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.string({
      resolve: usr => `${usr.firstName} ${usr.lastName}`,
    }),
    email: t.exposeString('email'),
    passwordHash: t.exposeString('passwordHash'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
    usersProjects: t.relation('usersProjects'),
  }),
});

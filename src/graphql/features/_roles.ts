import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { GraphQLBuilder } from '../builder';
import { RoleRef } from '../objects';
import { roles } from '../../db/schemas';

const builder = GraphQLBuilder.instance;

builder.queryType({
  description: "Role's feature queries",
  fields: t => ({
    roles: t.drizzleField({
      description: 'Get all system roles',
      type: [RoleRef],
      resolve: query => db.query.roles.findMany(query()),
    }),

    role: t.drizzleField({
      description: 'Get an system role by ID',
      type: RoleRef,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, _, args) =>
        db.query.roles.findFirst(
          query({
            where: eq(roles.id, args.id),
          })
        ),
    }),
  }),
});

builder.mutationType({
  description: "Role's feature mutations",
  fields: t => ({
    createRole: t.drizzleField({
      description: 'Creates a new role',
      type: RoleRef,
      args: {
        name: t.arg.string({
          required: true,
          validate: {
            minLength: 4,
            maxLength: 50,
          },
        }),
        description: t.arg.string({
          required: true,
          validate: {
            minLength: 8,
            maxLength: 120,
          },
        }),
      },
      validate: args => !!args.name || !!args.description,
      resolve: async (_, __, args) => {
        const insertedRoles = await db
          .insert(roles)
          .values({
            name: args.name,
            description: args.description,
          })
          .returning();

        return insertedRoles[0];
      },
    }),

    updateRole: t.drizzleField({
      description: 'Updates a role by given ID',
      type: RoleRef,
      args: {
        id: t.arg.string({
          required: true,
          validate: {
            uuid: true,
          },
        }),
        name: t.arg.string({
          validate: {
            minLength: 4,
            maxLength: 50,
          },
        }),
        description: t.arg.string({
          validate: {
            minLength: 8,
            maxLength: 120,
          },
        }),
      },
      validate: args => !!args.id || !!args.name || !!args.description,
      resolve: async (_, __, args) => {
        const updatedRoles = await db
          .update(roles)
          .set({
            name: args.name ?? undefined,
            description: args.description ?? undefined,
          })
          .where(eq(roles.id, args.id))
          .returning();

        if (updatedRoles.length == 0)
          return null;

        return updatedRoles[0];
      },
    }),

    deleteRole: t.boolean({
      description: 'Deletes a role by given ID',
      args: {
        id: t.arg.string({
          required: true,
          validate: {
            uuid: true,
          },
        }),
      },
      validate: args => !!args.id,
      resolve: async (_, args) => {
        const rows = await db
          .delete(roles)
          .where(eq(roles.id, args.id))
          .returning();

        return rows.length == 1;
      },
    }),
  }),
});

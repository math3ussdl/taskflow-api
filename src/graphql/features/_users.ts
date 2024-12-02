import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { GraphQLBuilder } from '../builder';
import { UserRef } from '../objects';
import { users } from '../../db/schemas';

const builder = GraphQLBuilder.instance;

builder.queryType({
  description: "User's feature queries",
  fields: t => ({
    users: t.drizzleField({
      description: 'Get all users',
      type: [UserRef],
      resolve: query => db.query.users.findMany(query()),
    }),

    user: t.drizzleField({
      description: 'Get an user by ID',
      type: UserRef,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, _, args) =>
        db.query.users.findFirst(
          query({
            where: eq(users.id, args.id),
          })
        ),
    }),
  }),
});

builder.mutationType({
  description: "User's feature mutations",
  fields: t => ({
    createUser: t.drizzleField({
      description: 'Creates a new user',
      type: UserRef,
      errors: {
        types: [Error],
      },
      args: {
        firstName: t.arg.string({
          required: true,
          validate: {
            minLength: 3,
            maxLength: 50,
          },
        }),
        lastName: t.arg.string({
          required: true,
          validate: {
            minLength: 3,
            maxLength: 50,
          },
        }),
        email: t.arg.string({
          required: true,
          validate: {
            email: true,
            minLength: 4,
            maxLength: 160,
          },
        }),
        password: t.arg.string({
          required: true,
          validate: {
            minLength: 6,
            maxLength: 12,
          },
        }),
        passwordConfirmation: t.arg.string({
          required: true,
          validate: {
            minLength: 6,
            maxLength: 12,
          },
        }),
      },
      validate: args =>
        !!args.firstName ||
        !!args.lastName ||
        !!args.email ||
        !!args.password ||
        !!args.passwordConfirmation,
      resolve: async (_, __, args) => {
        if (args.password !== args.passwordConfirmation)
          throw new Error('Passwords not matching!');

        const hashedPassword = await Bun.password.hash(args.password, {
          algorithm: 'bcrypt',
          cost: 10,
        });

        const insertedUsers = await db
          .insert(users)
          .values({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            passwordHash: hashedPassword,
          })
          .returning();

        return insertedUsers[0];
      },
    }),
  }),
});

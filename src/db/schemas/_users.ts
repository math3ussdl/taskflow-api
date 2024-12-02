import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { baseFields } from './common';
import { relations } from 'drizzle-orm';
import { userProjects } from './_user_projects';

export const users = pgTable('users', {
  ...baseFields,
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 160 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersProjects: many(userProjects),
}));

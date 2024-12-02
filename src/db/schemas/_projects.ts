import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { baseFields } from './common';
import { relations } from 'drizzle-orm';
import { userProjects } from './_user_projects';

export const projects = pgTable('projects', {
  ...baseFields,
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  usersProjects: many(userProjects),
}));

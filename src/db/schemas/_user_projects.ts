import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './_users';
import { projects } from './_projects';
import { roles } from './_roles';
import { relations } from 'drizzle-orm';

export const userProjects = pgTable('user_projects', {
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
});

export const userProjectsRelations = relations(userProjects, ({ one }) => ({
  project: one(projects, {
    fields: [userProjects.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [userProjects.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userProjects.roleId],
    references: [roles.id],
  }),
}));

import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { baseFields } from './common';

export const roles = pgTable('roles', {
  ...baseFields,
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
});

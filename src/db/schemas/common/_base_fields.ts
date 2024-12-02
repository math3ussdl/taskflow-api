import { sql } from 'drizzle-orm';
import { boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseFields = {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  active: boolean('is_active').default(false),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`),
};

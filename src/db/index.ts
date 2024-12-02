import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

export const db = drizzle({ connection: process.env.DATABASE_URL!, schema });
import yoga from '@elysiajs/graphql-yoga';
import { Elysia } from 'elysia';
import { GraphQLBuilder } from './graphql';

const schema = GraphQLBuilder.instance.toSchema();

const app = new Elysia().use(yoga({ schema })).listen(3000);
console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);

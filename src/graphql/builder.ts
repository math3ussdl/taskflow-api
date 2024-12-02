import SchemaBuilder from '@pothos/core';
import DrizzlePlugin from '@pothos/plugin-drizzle';
import ErrorsPlugin from '@pothos/plugin-errors';
import ZodPlugin from '@pothos/plugin-zod';
import { DateTimeResolver } from 'graphql-scalars';
import { db } from '../db';
import * as schema from '../db/schemas';

export interface PothosTypes {
  DrizzleSchema: typeof schema;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}

export class GraphQLBuilder {
  static #instance: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<PothosTypes>
  >;

  public static get instance(): PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<PothosTypes>
  > {
    if (!GraphQLBuilder.#instance) {
      GraphQLBuilder.#instance = new SchemaBuilder<PothosTypes>({
        plugins: [DrizzlePlugin, ErrorsPlugin, ZodPlugin],
        drizzle: {
          client: db,
          schema,
        },
        errors: {
          defaultTypes: [],
        },
      });

      // Add date scalar
      this.#instance.addScalarType('Date', DateTimeResolver);

      // Add Error type
      this.#instance.objectType(Error, {
        name: 'Error',
        fields: t => ({
          name: t.exposeString('name'),
          message: t.exposeString('message'),
          stack: t.exposeString('stack'),
        }),
      });
    }

    return GraphQLBuilder.#instance;
  }
}

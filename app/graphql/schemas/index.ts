import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import { UserSchema } from './user.schema';
import { AuthSchema } from './auth.schema';

const schema = (): GraphQLSchema => {
  const schemas = [UserSchema];
  return mergeSchemas({ schemas });
};

const authorizationSchema = (): GraphQLSchema => {
  const schemas = [AuthSchema];
  return mergeSchemas({ schemas });
};

export { schema, authorizationSchema };

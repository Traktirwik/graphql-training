import { graphqlHTTP } from 'express-graphql';
import { authorizationSchema, schema } from '../graphql/schemas';
import { errorHandler } from '../utils/error-handler';

const graphQl = graphqlHTTP((req: any, res: any) => ({
  schema: schema(),
  graphiql: true,
  formatError: (error) => {
    return errorHandler(error, res);
  },
}));

const graphQlAuthorization = graphqlHTTP((req: any, res: any) => ({
  schema: authorizationSchema(),
  graphiql: true,
  formatError: (error) => {
    return errorHandler(error, res);
  },
}));

export default {
  graphQlAuthorization,
  graphQl,
};

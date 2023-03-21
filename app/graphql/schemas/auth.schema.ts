import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { Types } from '../types';
import { services } from '../services';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ping: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signIn: {
      type: Types.userType.user,
      args: {
        input: { type: new GraphQLNonNull(Types.authType.signInInput) },
      },
      resolve: async (_, args: any, { res }) => {
        const user = await services.auth.signIn(args.input);
        const refreshToken = services.token.generateRefreshToken(user.id, res);
        await services.user.updateUserById(user.id, { refreshToken });
        services.token.generateAccessToken(user.id, res);
        return user;
      },
    },
    signUp: {
      type: Types.userType.user,
      args: {
        input: { type: new GraphQLNonNull(Types.authType.signUpInput) },
      },
      resolve: async (_, args: any) => {
        return services.auth.signUp(args.input);
      },
    },
  },
});

export const AuthSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';
import { Types } from '../types';
import { services } from '../services';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: GraphQLList(Types.userType.user),
      resolve: async () => {
        return services.user.getAllUsers();
      },
    },
    user: {
      type: Types.userType.user,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args: any) => {
        return services.user.getUserById(args.id);
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args: any) => {
        return services.user.deleteUserById(args.id);
      },
    },
    updateUser: {
      type: Types.userType.user,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(Types.userType.userUpdateInput) },
      },
      resolve: async (_, args: any) => {
        return services.user.updateUserById(args.id, args.input);
      },
    },
  },
});

export const UserSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

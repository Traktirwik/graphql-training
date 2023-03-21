import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
} from 'graphql';

const user = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const userUpdateInput = new GraphQLInputObjectType({
  name: 'userUpdateInput',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

export default {
  user,
  userUpdateInput,
};

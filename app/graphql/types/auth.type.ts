import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

const signIn = new GraphQLObjectType({
  name: 'signIn',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

const signUpInput = new GraphQLInputObjectType({
  name: 'signUpInput',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    passwordCheck: { type: GraphQLString },
  },
});

const signInInput = new GraphQLInputObjectType({
  name: 'signInInput',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export default {
  signIn,
  signUpInput,
  signInInput,
};

import gql from "graphql-tag";

export default gql`
  type User {
    _id: String!
    name: String!
    email: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
    firstNameLastName: String!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }
  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }
  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }
`;

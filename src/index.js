import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";
import initiateMongoServer from "./config/db/initiateMongoServer.js";

/** initialize mongo server */
initiateMongoServer();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4200 },
  context: ({ req, res }) => {
    return {
      res,
      req,
    };
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

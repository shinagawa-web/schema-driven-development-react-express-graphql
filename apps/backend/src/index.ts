import express from "express";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from "./graphql/type";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(PORT, () => {
    console.log('GraphQL server is running at http://localhost:4000/graphql');
  });
};

startServer();



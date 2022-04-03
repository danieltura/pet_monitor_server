import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello from our GraphQL backend!",
  },
};

const start = async () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Wellcome To Pet Monitor Server");
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`listening: http://localhost:4000${server.graphqlPath}`)
  );
};
(async () => start())();

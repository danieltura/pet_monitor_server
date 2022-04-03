const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload");
const bodyParser = require("body-parser");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

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

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`listening: http://localhost:4000${server.graphqlPath}`)
  );
};
(async () => start())();

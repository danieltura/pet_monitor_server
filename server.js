require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { typeDefs, resolvers } from "./graphql";
import DataSources from "./data_sources/index";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";

const start = async () => {
  const app = express();

  const apiKey = process.env.FIREBASE_API_KEY;
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  const firebase = initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
  });

  const dataSources = new DataSources(
    databaseURL,
    getDatabase(firebase),
    getStorage(firebase),
    getAuth(firebase)
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => {
      return {
        headers: req.headers,
        firebase,
      };
    },
    dataSources: () => dataSources.getAllSources(),
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

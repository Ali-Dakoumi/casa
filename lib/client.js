import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";
import { prismicClient, repositoryName, prismic } from "../prismicio";
let client;
export default function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}
export function _createApolloClient(param) {
  // if (param === "ssg") {
  return new ApolloClient({
    link: new HttpLink({
      uri: prismic.getGraphQLEndpoint(repositoryName),
      fetch: prismicClient.graphqlFetch,
      useGETForQueries: true,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });
  // } else {
  return function createApolloClient() {
    return new ApolloClient({
      link: new HttpLink({ uri: "/api/graphql", credentials: "same-origin" }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
        },
      },
    });
  };
  // }
}

import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "./sm.json";

/**
 * The project's Prismic repository name.
 */
const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

// Update the routes array to match your project's route structure
/** @type {prismic.ClientConfig['routes']} **/
const routes = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "page",
    path: "/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */

// The rest of the file...

const prismicClient = prismic.createClient(
  prismic.getEndpoint(repositoryName),
  {
    accessToken: "",
    routes: [
      {
        type: "page",
        path: "/:uid",
      },
    ],
  }
);
export { prismic, prismicClient, repositoryName };

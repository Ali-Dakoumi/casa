import "../styles/globals.css";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import { Provider } from "urql";
import client from "../lib/client";
import { DataProvider } from "../lib/context";

export default function App({ Component, pageProps }) {
  console.log(client);
  return (
    <DataProvider>
      <Provider value={client}>
        <PrismicProvider
          internalLinkComponent={({ href, ...props }) => (
            <Link href={href}>
              <a {...props} />
            </Link>
          )}
        >
          <PrismicPreview repositoryName={repositoryName}>
            <Component {...pageProps} />
          </PrismicPreview>
        </PrismicProvider>
      </Provider>
    </DataProvider>
  );
}

import { ApolloProvider } from "@apollo/client";
import apolloClient from "lib/apollo-client";
import React, { FC } from "react";
import { HelmetProvider } from "react-helmet-async";

//@ts-ignore
const App: FC = ({ pageProps, Component }) => {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </HelmetProvider>
  );
};

export default App;

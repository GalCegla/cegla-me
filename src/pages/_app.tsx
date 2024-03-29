import { ApolloProvider } from "@apollo/client";
import apolloClient from "lib/apollo-client";
import React, { FC } from "react";

//@ts-ignore
const App: FC = ({ pageProps, Component }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;

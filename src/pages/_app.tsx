import { ApolloProvider } from "@apollo/client";
import apolloClient from "lib/apollo-client";
import React, { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import peggyPastels from "react95/dist/themes/peggysPastels";
import { styleReset } from "react95";
//@ts-ignore
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
//@ts-ignore
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

//@ts-ignore
const App: FC = ({ pageProps, Component }) => {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <ThemeProvider theme={peggyPastels}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </HelmetProvider>
  );
};

export default App;

import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import client from "api";
import Layout from "shell/layout";
import theme from "../common/styles/index.js";

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout />
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;

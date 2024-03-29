import {
  ApolloClient,
  concat,
  InMemoryCache,
  TypePolicies,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import { getId } from "./client-auth";

export const TYPE_POLICIES: TypePolicies = {
  /**
   * Disable normalization for engagement input
   * @see: https://www.apollographql.com/docs/react/caching/cache-configuration/#disabling-normalization
   */
  EngagementInput: {
    keyFields: false,
  },
};

/**
 * The Apollo client cache
 */
export const cache = new InMemoryCache({
  typePolicies: TYPE_POLICIES,
});

/**
 * Initialized Apollo client
 */
export default new ApolloClient({
  link: concat(
    setContext((next, { headers }) => {
      const id = getId();
      if (!id) {
        return;
      }
      return {
        headers: {
          ...headers,
          authorization: `Basic ${btoa(`${id}:`)}`,
        },
      };
    }),
    createUploadLink({
      uri: "/api/graphql",
    })
  ),
  cache,
});

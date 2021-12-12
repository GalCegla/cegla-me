import { NextApiRequest, NextApiResponse } from "next";
import { ApolloError, ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import schema, { Context } from "schema";

import prisma from "lib/prisma";

/**
 * The context object passed between Apollo Server resolvers automatically
 * @see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
 */
type ContextFunctionParams = {
  req: MicroRequest;
  res: ServerResponse;
};

const apolloServer = new ApolloServer({
  context: async ({ req, res }: ContextFunctionParams): Promise<Context> => ({
    prisma,
  }),
  schema,
  formatError(error) {
    if (error.originalError) {
      if (!(error.originalError instanceof ApolloError)) {
        console.error(error.originalError);
      }
    } else {
      error.stack = error.stack || error?.extensions?.exception?.stacktrace;
      console.error(error);
    }
    return error;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.startsWith("multipart/form-data")) {
    // @ts-ignore
    req.filePayload = await processRequest(req, res);
  }
  return handler(req, res);
};

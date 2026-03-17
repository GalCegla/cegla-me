import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiRequest, NextApiResponse } from "next";
import schema, { Context } from "schema";
import prisma from "lib/prisma";

const apolloServer = new ApolloServer<Context>({
  schema,
  formatError(formattedError, error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return formattedError;
  },
});

const handler = startServerAndCreateNextHandler<NextApiRequest, Context>(
  apolloServer,
  {
    context: async (req, res): Promise<Context> => ({
      prisma,
    }),
  },
);

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await handler(req, res);
};

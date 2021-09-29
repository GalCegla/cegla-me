import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { join } from "path";

import * as types from "./types";

const rootDirectory = join(__dirname, "..", "..");

export default makeSchema({
  types,
  contextType: { module: require.resolve("./context"), export: "Context" },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: join(rootDirectory, "src", "nexus-typegen.ts"),
    schema: join(rootDirectory, "schema.graphql"),
  },
});

export type { Context } from "./context";

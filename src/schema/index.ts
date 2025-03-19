import { makeSchema } from "nexus";
// import nexusPrisma from "nexus-prisma";
import { join } from "path";
import { DateTime, Rating } from "./types/scalars";
import {
  Post,
  PostQuery,
  PostMutation,
  PostCreateInput,
  PostUpdateInput,
  PostFindUniqueInput,
} from "./types/post";
import {
  Shop,
  ShopQuery,
  ShopMutation,
  ShopCreateInput,
  ShopUpdateInput,
  ShopWhereUniqueInput,
  ShopConnectNestedOne,
} from "./types/shop";

import * as types from "./types";

const rootDirectory = join(__dirname, "..", "..");

export default makeSchema({
  types: [
    DateTime,
    Rating,
    Post,
    PostQuery,
    PostMutation,
    PostCreateInput,
    PostUpdateInput,
    PostFindUniqueInput,
    Shop,
    ShopQuery,
    ShopMutation,
    ShopCreateInput,
    ShopUpdateInput,
    ShopWhereUniqueInput,
    ShopConnectNestedOne,
  ],
  contextType: {
    module: join(process.cwd(), "src", "schema", "context.ts"),
    export: "Context",
  },
  // plugins: [
  //   nexusPrisma({
  //     experimentalCRUD: true,
  //   }),
  // ],
  outputs: {
    typegen: join(__dirname, "generated", "nexus-typegen.ts"),
    schema: join(__dirname, "generated", "schema.graphql"),
  },
});

export type { Context } from "./context";

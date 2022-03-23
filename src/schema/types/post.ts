import { Prisma } from "@prisma/client";
import * as nexus from "nexus";
import { ShopConnectNestedOne } from "./shop";

export const Post = nexus.objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.title();
    t.model.subtitle();
    t.model.body();
    t.model.shop();
    t.model.shopId();
    t.model.rating();
    t.model.thumbnail();
  },
});

export const PostQuery = nexus.extendType({
  type: "Query",
  definition(t) {
    t.crud.post();
    t.crud.posts();
  },
});

export const PostMutation = nexus.extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOnePost", {
      type: Post,
      args: {
        data: nexus.nonNull(nexus.arg({ type: PostCreateInput })),
      },
      async resolve(source, args, ctx) {
        return ctx.prisma.post.create({
          data: { ...args.data } as Prisma.PostCreateInput,
        });
      },
    });
    t.crud.updateOnePost();
  },
});

export const PostCreateInput = nexus.inputObjectType({
  name: "PostCreateInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("subtitle");
    t.nonNull.string("body");
    t.nonNull.string("thumbnail");
    t.nonNull.field("shop", {
      type: ShopConnectNestedOne,
      description: "The shop about which the post is about",
    });
    t.nonNull.field("rating", {
      type: "Rating",
      description: "The rating of the shop defined in the post",
    });
  },
});

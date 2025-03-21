import { Prisma } from "@prisma/client";
import * as nexus from "nexus";
import { ShopConnectNestedOne } from "./shop";
import { Post as NexusPost } from "nexus-prisma";

const SortOrder = nexus.enumType({
  name: "SortOrder",
  members: ["asc", "desc"],
});

export const Post = nexus.objectType({
  name: "Post",
  definition(t) {
    t.field(NexusPost.id);
    t.field(NexusPost.createdAt);
    t.field(NexusPost.updatedAt);
    t.field(NexusPost.title);
    t.field(NexusPost.subtitle);
    t.field(NexusPost.body);
    t.field(NexusPost.shop);
    t.field(NexusPost.shopId);
    t.field(NexusPost.rating);
    t.field(NexusPost.thumbnail);
  },
});

export const PostQuery = nexus.extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("post", {
      type: "Post",
      args: {
        where: nexus.nonNull(nexus.arg({ type: PostWhereUniqueInput })),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: args.where.id,
          },
        });
      },
    });
    // t.crud.post();
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      args: {
        orderBy: nexus.arg({
          type: nexus.inputObjectType({
            name: "PostOrderByInput",
            definition(t) {
              t.field("createdAt", { type: SortOrder });
              t.field("updatedAt", { type: SortOrder });
              t.field("title", { type: SortOrder });
            },
          }),
        }),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.post.findMany({
          orderBy: (args.orderBy as Prisma.PostOrderByWithRelationInput) || {
            createdAt: "asc",
          },
        });
      },
    });
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
    t.nonNull.field("updateOnePost", {
      type: Post,
      args: {
        data: nexus.nonNull(nexus.arg({ type: PostUpdateInput })),
        where: nexus.nonNull(nexus.arg({ type: PostWhereUniqueInput })),
      },
      async resolve(source, args, ctx) {
        return ctx.prisma.post.update({
          where: args.where as Prisma.PostWhereUniqueInput,
          data: args.data as Prisma.PostUpdateInput,
        });
      },
    });
  },
});

export const PostWhereUniqueInput = nexus.inputObjectType({
  name: "PostWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
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

export const PostUpdateInput = nexus.inputObjectType({
  name: "PostUpdateInput",
  definition(t) {
    t.string("title");
    t.string("subtitle");
    t.string("body");
    t.string("thumbnail");
    t.field("shop", {
      type: ShopConnectNestedOne,
      description: "The shop about which the post is about",
    });
    t.field("rating", {
      type: "Rating",
      description: "The rating of the shop defined in the post",
    });
  },
});

import * as nexus from "nexus";
import { Shop as NexusShop } from "nexus-prisma";
import { Prisma } from "@prisma/client";

export const Shop = nexus.objectType({
  name: "Shop",
  definition(t) {
    t.field(NexusShop.id);
    t.field(NexusShop.createdAt);
    t.field(NexusShop.updatedAt);
    t.field(NexusShop.name);
    t.field(NexusShop.posts);
  },
});

export const ShopQuery = nexus.extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("shop", {
      type: "Shop",
      args: {
        where: nexus.nonNull(nexus.arg({ type: "ShopWhereUniqueInput" })),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.shop.findUnique({
          where: {
            id: args.where.id || undefined,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("shops", {
      type: "Shop",
      resolve(_, args, ctx) {
        return ctx.prisma.shop.findMany();
      },
    });
  },
});

export const ShopMutation = nexus.extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneShop", {
      type: Shop,
      args: {
        data: nexus.nonNull(nexus.arg({ type: "ShopCreateInput" })),
      },
      async resolve(source, args, ctx) {
        return ctx.prisma.shop.create({
          data: { ...args.data } as Prisma.ShopCreateInput,
        });
      },
    });
    t.nonNull.field("deleteOneShop", {
      type: Shop,
      args: {
        where: nexus.nonNull(nexus.arg({ type: "ShopWhereUniqueInput" })),
      },
      async resolve(source, args, ctx) {
        return ctx.prisma.shop.delete({
          where: args.where as Prisma.ShopWhereUniqueInput,
        });
      },
    });
    t.nonNull.field("updateOneShop", {
      type: Shop,
      args: {
        data: nexus.nonNull(nexus.arg({ type: "ShopUpdateInput" })),
        where: nexus.nonNull(nexus.arg({ type: "ShopWhereUniqueInput" })),
      },
      async resolve(source, args, ctx) {
        return ctx.prisma.shop.update({
          where: args.where as Prisma.ShopWhereUniqueInput,
          data: args.data as Prisma.ShopUpdateInput,
        });
      },
    });
  },
});

export const ShopWhereUniqueInput = nexus.inputObjectType({
  name: "ShopWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const ShopCreateInput = nexus.inputObjectType({
  name: "ShopCreateInput",
  definition(t) {
    t.nonNull.string("name");
  },
});

export const ShopUpdateInput = nexus.inputObjectType({
  name: "ShopUpdateInput",
  definition(t) {
    t.string("name");
  },
});

export const ShopConnectNestedOne = nexus.inputObjectType({
  name: "ShopConnectNestedOne",
  definition(t) {
    t.nonNull.field("connect", {
      type: ShopWhereUniqueInput,
    });
  },
});

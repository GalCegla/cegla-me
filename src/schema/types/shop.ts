import * as nexus from "nexus";

export const Shop = nexus.objectType({
  name: "Shop",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.name();
    t.model.posts();
  },
});

export const ShopQuery = nexus.extendType({
  type: "Query",
  definition(t) {
    t.crud.shop();
    t.crud.shops();
  },
});

export const ShopMutation = nexus.extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneShop();
    t.crud.deleteOneShop();
    t.crud.updateOneShop();
  },
});

export const ShopConnectNestedOne = nexus.inputObjectType({
  name: "ShopConnectNestedOne",
  definition(t) {
    t.nonNull.field("connect", {
      type: "ShopWhereUniqueInput",
    });
  },
});

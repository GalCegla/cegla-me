import * as nexus from "nexus";

export const User = nexus.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.Posts();
    t.model.role();
  },
});

export const UserQuery = nexus.extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export const UserMutation = nexus.extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();
  },
});

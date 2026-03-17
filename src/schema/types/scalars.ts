import * as nexus from "nexus";

export const DateTime = nexus.scalarType({
  name: "DateTime",
  asNexusMethod: "dateTime",
  description: "DateTime custom scalar type",
  parseValue(value) {
    return new Date(value as string);
  },
  serialize(value) {
    return (value as Date).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      return new Date(ast.value);
    }
    return null;
  },
});

export const Rating = nexus.enumType({
  name: "Rating",
  members: ["GOOD", "OK", "BAD"],
});

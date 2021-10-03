module.exports = {
  client: {
    service: {
      name: "app",
      localSchemaFile: "./schema.graphql",
    },
    includes: ["./src/**/*.ts{,x}"],
  },
};

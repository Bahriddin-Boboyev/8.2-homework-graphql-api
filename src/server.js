import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";

/*------------------ task 1 --------------------*/
/* import resolvers from "./tasks/task-1.js";
const typeDefs = readFileSync("./src/schemas/schema-1.gql", "utf8");
 */

/*------------------ task 2 --------------------*/
import resolvers from "./tasks/task-2.js";
const typeDefs = readFileSync("./src/schemas/schema-2.gql", "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server).then(({ url }) =>
  console.log(`Server is running the url: ${url}`)
);

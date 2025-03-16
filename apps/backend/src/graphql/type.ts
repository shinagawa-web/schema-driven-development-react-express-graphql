import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import path from "path";

const schemaPath = path.resolve(process.cwd(), "../packages/graphql/schema/post.graphql");

const typeDefs = gql(readFileSync(schemaPath, "utf-8"));

export { typeDefs };

import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql"; 

const client = new GraphQLClient("http://localhost:4000/graphql");
const sdk = getSdk(client);

export async function getPosts() {
  const response = await sdk.GetPosts();
  return response.posts
}
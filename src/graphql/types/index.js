import { mergeTypeDefs } from "@graphql-tools/merge";
import User from "./User/index.js";
import Comment from "./Comment/index.js";
import Post from "./Post/index.js";

const typeDefs = mergeTypeDefs([User, Comment, Post]);

export default typeDefs;

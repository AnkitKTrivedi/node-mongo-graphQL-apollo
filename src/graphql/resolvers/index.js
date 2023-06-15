import { mergeResolvers } from "@graphql-tools/merge";
import User from "./User/index.js";
import Comment from "./Comment/index.js";
import Post from "./Post/index.js";

const resolvers = mergeResolvers([User, Comment, Post]);

export default resolvers;

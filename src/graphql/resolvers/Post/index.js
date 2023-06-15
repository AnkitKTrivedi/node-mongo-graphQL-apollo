import Comment from "../../../models/Comment.js";
import Post from "../../../models/Post.js";
import User from "../../../models/User.js";
import { transformPost } from "../merge.js";

export default {
  Query: {
    post: async (parent, { _id }, context, info) => {
      return await Post.findOne({ _id }).exec();
    },
    posts: async (parent, args, context, info) => {
      const res = await Post.find({}).populate().exec();

      //setting  and getting cookies
      context.res.set("set-cookie", ["key1=value1", "key2=value2"]);
      console.log("req.headers.cookies", context.req.headers.cookie);

      return res.map((u) => ({
        _id: u._id.toString(),
        title: u.title,
        body: u.body,
        published: u.published,
        author: u.author,
        comments: u.comments,
        date: u.date,
      }));
    },
  },
  Mutation: {
    createPost: async (parent, { post }, context, info) => {
      const newPost = new Post({
        title: post.title,
        body: post.body,
        published: post.published,
        author: post.author,
        date: post.date,
      });
      let createdPost;
      try {
        const result = await newPost.save();
        createdPost = transformPost(result);
        const creator = await User.findById(post.author);

        if (!creator) {
          throw new Error("User not found.");
        }
        creator.posts.push(newPost);
        await creator.save();
        return createdPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updatePost: async (parent, { _id, post }, context, info) => {
      try {
        const res = await Post.findByIdAndUpdate(
          _id,
          { $set: { ...post } },
          { new: true }
        ).exec();
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deletePost: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the post and deleting it from the list
        const post = await Post.findById(_id);
        const creator = await User.findById(post.author);
        if (!creator) {
          throw new Error("user not found.");
        }
        const index = creator.posts.indexOf(_id);
        if (index > -1) {
          creator.posts.splice(index, 1);
        }
        await creator.save();
        const res = await Post.findByIdAndDelete(_id).exec();
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Subscription: {
    post: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      },
    },
  },
  Post: {
    author: async ({ author }, args, context, info) => {
      return await User.findById(author);
    },
    comments: async ({ author }, args, context, info) => {
      return await Comment.find({ author });
    },
  },
};

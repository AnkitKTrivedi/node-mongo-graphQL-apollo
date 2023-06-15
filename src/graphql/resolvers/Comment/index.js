import Comment from "../../../models/Comment.js";
import Post from "../../../models/Post.js";
import User from "../../../models/User.js";

export default {
  Query: {
    comment: async (parent, { _id }, context, info) => {
      return await Comment.find({ _id });
    },
    comments: async (parent, args, context, info) => {
      const res = await Comment.find({}).populate().exec();

      return res.map((u) => ({
        _id: u._id.toString(),
        text: u.text,
        author: u.author,
        post: u.post,
      }));
    },
  },
  Mutation: {
    createComment: async (parent, { comment }, context, info) => {
      const newComment = new Comment({
        text: comment.text,
        author: comment.author,
        post: comment.post,
      });
      try {
        const res = await newComment.save();
        return res;
      } catch (err) {
        return err;
      }
    },
    updateComment: async (parent, { _id, comment }, context, info) => {
      try {
        const res = await Comment.findByIdAndUpdate(
          _id,
          { $set: { ...comment } },
          { new: true }
        ).exec();
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteComment: async (parent, { _id }, context, info) => {
      try {
        const res = await Comment.findByIdAndDelete(_id).exec();
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Subscription: {
    comment: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      },
    },
  },
  Comment: {
    author: async ({ author }, args, context, info) => {
      return await User.findById({ _id: author });
    },
    post: async ({ post }, args, context, info) => {
      return await Post.findById({ _id: post });
    },
  },
};

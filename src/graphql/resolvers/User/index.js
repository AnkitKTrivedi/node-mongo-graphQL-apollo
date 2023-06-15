import Comment from "../../../models/Comment.js";
import Post from "../../../models/Post.js";
import User from "../../../models/User.js";

// Search
export default {
  Query: {
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({}).populate().exec();

      return users.map((u) => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        age: u.age,
        posts: u.posts,
        comments: u.comments,
      }));
    },
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = new User({
        name: user.name,
        email: user.email,
        age: user.age,
      });
      try {
        const res = await newUser.save();
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      try {
        const res = await User.findByIdAndUpdate(
          _id,
          { $set: { ...user } },
          { new: true }
        ).exec();
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteUser: async (parent, { _id }, context, info) => {
      try {
        const res = await User.findByIdAndDelete(_id).exec();
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  User: {
    posts: async ({ _id }, args, context, info) => {
      return await Post.find({ author: _id });
    },
    comments: async ({ _id }, args, context, info) => {
      return await Comment.find({ author: _id });
    },
    firstNameLastName: async (
      { name, firstName, lastName },
      args,
      context,
      info
    ) => {
      return firstName + lastName;
    },
  },
};

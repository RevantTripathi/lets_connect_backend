const Post = require("../models/Post");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().lean();

  if (!posts?.length) {
    return res.status(400).json({ message: "No posts found" });
  }

  const postsWithUser = await Promise.all(
    posts.map(async (post) => {
      const user = await User.findById(post.user).lean().exec();
      return { ...post, username: user.username };
    })
  );

  res.json(postsWithUser);
});

const createNewPost = asyncHandler(async (req, res) => {
  const { user, data, likes } = req.body;

  if (!user || !data ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const post = await Post.create({ user, data, likes });

  if (post) {
    return res.status(201).json({ message: "New post created" });
  } else {
    return res.status(400).json({ message: "Invalid post data received" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { id, likes } = req.body;

  if (!id  || !likes) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const post = await Post.findById(id).exec();

  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }

  //post.user = user;
  //post.data = data;
  post.likes = likes;

  const updatedPost = await post.save();

  res.json(` updated the post`);
});
const getUser = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const user1 = await User.findById(user).exec();
  if (!user1) {
    return res.status(400).json({ message: "No user Associated to thi post" });
  }
  res.json(user1);
});

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  getUser,
};

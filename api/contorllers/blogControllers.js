const Category = require("../models/category");
const mongoose = require("mongoose");
const Post = require("../models/post");

// categories
const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(allCategory);
  } catch (err) {
    console.log(err);
  }
};

// limit 5 categories
const getAllCategoryLimit5 = async (req, res) => {
  try {
    const allCategory = await Category.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(allCategory);
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);

    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal Server Error" });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid category id" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid category id" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body, //  in mongodb $set operator is used to update the value of an existing field in the document
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log(err);
  }
};

const getPostByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const posts = await Post.find({ category: categoryName }).sort({
      createdAt: -1,
    });
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "opps.. No posts under this category   " });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid category id" });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ error: "Category has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

// posts
const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(allPost);
  } catch (err) {
    console.log(err);
  }
};

// limit 5 post
const getAllPostLimit5 = async (req, res) => {
  try {
    const allPost = await Post.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(allPost);
  } catch (err) {
    console.log(err);
  }
};

// all post top stories
const getAllTopStories = async (req, res) => {
  try {
    const allPost = await Post.find({ topStory: "yes" })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(allPost);
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  try {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "invalid post id" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: req.body, //  in mongodb $set operator is used to update the value of an existing field in the document
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post id" });
    }

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getAllPost,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
  getAllCategoryLimit5,
  getAllPostLimit5,
  getAllTopStories,
  getPostByCategory,
  getSingleCategory,
};

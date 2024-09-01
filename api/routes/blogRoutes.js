const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../contorllers/verifyToken");

const {
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
} = require("../contorllers/blogControllers");

// categories
router.get("/allCategory", getAllCategory);
router.get("/singleCategory/:categoryId", getSingleCategory);
router.get("/allCategoryLimit5", getAllCategoryLimit5);
router.post("/createCategory", createCategory);
router.put("/editCategory/:categoryId", editCategory);
router.delete("/deleteCategory/:categoryId", deleteCategory);

// posts
router.get("/posts/category/:category", getPostByCategory);
router.get("/allPost", getAllPost);
router.get("/allPostLimit5", getAllPostLimit5);
router.get("/allTopStories", getAllTopStories);
router.post("/createPost", createPost);
router.put("/editPost/:postId", editPost);
router.get("/post/:postId", getSinglePost);
router.delete("/deletePost/:postId", deletePost);

module.exports = router;

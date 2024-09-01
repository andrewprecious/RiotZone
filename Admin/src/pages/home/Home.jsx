import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import Navbar from "../../components/navabr/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  // fetch categories from backend(api)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allcategoryLimit5`);
        // console.log(res);
        // console.log(res.data);
        setCategories(res.data); //updates categories
      } catch (error) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  // fetch posts from backend(api)
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allPostLimit5`);
        // console.log(res);
        // console.log(res.data);
        setPosts(res.data); //updates Posts
      } catch (error) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  // handle category deletion with confirmation
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${URL}/blog/deleteCategory/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        // display all other categories except the one that has been deleted on the UL without refreshing the page
        alert("Category deleted successfully");
      } catch (err) {
        console.log(err);
        alert("Failed to delete the category");
      }
    }
  };

  // handle delete post
  const handleDeletePost = async (id) => {
    const confirmPostDelete = window.confirm(
      "This post will be permanently deleted. Continue?"
    );
    if (confirmPostDelete) {
      try {
        await axios.delete(`${URL}/blog/deletePost/${id}`);
        setPosts(posts.filter((post) => post._id !== id));
        alert("Post deletion completed");
      } catch (err) {
        console.log(err);
        alert("We couldn’t delete the post. Please check and try again");
      }
    }
  };
  return (
    <div className="Home">
      <Sidebar />
      <div className="right">
        <Navbar />
        <h3>Categories</h3>
        <div className="categories">
          {categories.map((category) => (
            <div className="category" key={category._id}>
              <img src={category.image} alt="test image" />
              <p>{category.name}</p>
              <div>
                <Link to={`/editCategory/${category._id}`}>edit</Link>
                <Link onClick={() => handleDeleteCategory(category._id)}>
                  delete
                </Link>
              </div>
            </div>
          ))}
        </div>
        <br />
        <hr />
        <br />
        <h3>Posts</h3>
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <img src={post.image} alt="test image" />
              <p>{post.category}</p>
              <p>
                {post.category.map((cat, index) => (
                  <span key={index} style={{ marginRight: "5px" }}>
                    {cat}
                  </span>
                ))}
              </p>
              <div>
                <Link to={`/editPost/${post._id}`}>edit</Link>
                <Link onClick={() => handleDeletePost(post._id)}>delete</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

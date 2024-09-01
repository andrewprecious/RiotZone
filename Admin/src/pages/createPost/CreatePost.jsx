import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navabr/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./createPost.css";
import ReactMarkdown from "react-markdown";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    snippet: "",
    body: "",
    category: [],
    topStory: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...prevData.category, value],
      }));
    }
    // if the checkbox is unchecked
    else {
      setFormData((prevData) => ({
        ...prevData,
        category: prevData.category.filter((category) => category !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${URL}/blog/createPost`, formData);
      if (response.status === 200) {
        setSuccess("Post created successfully");
        navigate("/dashboard"); // Navigate to the list of posts after creation
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="createPost">
      <Sidebar />
      <div className="right">
        <Navbar />
        <div className="form-container">
          <h2>Create New Post</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="snippet">Snippet:</label>
              <input
                type="text"
                name="snippet"
                id="snippet"
                value={formData.snippet}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body:</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                className="form-control"
              />
              <div className="markdown-preview">
                <h4>Preview</h4>
                {/* <ReactMarkdown> {formData.body} </ReactMarkdown> */}
              </div>
            </div>
            <div className="form-group">
              <label>Category:</label>
              <div className="checkbox-group">
                {["fashion", "music", "football", "basketball"].map((cat) => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      value={cat}
                      checked={formData.category.includes(cat)} // determines whether the checkbox is checked or not based on if the category is included in the formData.category array.
                      onChange={handleCategoryChange} // The function to call when the checkbox is checked or unchecked.
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="topStory">TopStory:</label>
              <select
                name="topStory"
                id="topStory"
                value={formData.topStory}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value=""></option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Post..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

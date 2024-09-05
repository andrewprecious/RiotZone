import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navabr/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./editPost.css";
import ReactMarkdown from "react-markdown";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

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

  useEffect(() => {
    // fetch the existing post data
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${URL}/blog/post/${id}`);
        setFormData({
          title: response.data.title,
          image: response.data.image,
          snippet: response.data.snippet,
          body: response.data.body,
          category: response.data.category || [],
          topStory: response.data.topStory || "",
        });
      } catch (err) {
        setError("Failed to load post data.");
      }
    };
    fetchPost();
  }, [id]);

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
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.put(`${URL}/blog/editPost/${id}`, formData);
      if (response.status === 200) {
        setSuccess("Post updated successfully");
        navigate("/dashboard"); // Navigate to the list of posts after creation
      }
    } catch (err) {
      setError("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editPost">
      <Sidebar />
      <div className="right">
        <Navbar />
        <div className="form-container">
          <h2>Edit Post</h2>
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
              <input
                type="text"
                name="body"
                id="body"
                value={formData.body}
                onChange={handleChange}
                required
                className="form-control"
              />
              <div className="markdown-preview">
                <h4>Preview:</h4>
                <ReactMarkdown>{formData.body}</ReactMarkdown>
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
                      checked={formData.category.includes(cat)}
                      onChange={handleCategoryChange}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="topStory">TopStory:</label>
              <select
                id="topStory"
                name="topStory"
                value={formData.topStory}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating Post..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navabr/Navbar";
import axios from "axios";
import "./createCategory.css";
import { URL } from "../../App";
import { useState } from "react";

const CreateCategory = () => {
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${URL}/blog/createCategory`, formData);
      setSuccess("Category created successfully");
      setFormData({ name: "", image: "" });
    } catch (err) {
      setError("Failed to create category. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createCategory">
      <Sidebar />
      <div className="right">
        <Navbar />
        <div className="form-container">
          <h2>Create a New Category</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Category Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Category Image URL:</label>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

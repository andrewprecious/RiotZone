import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navabr/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./editCategory.css";

const EditCategory = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // grabs category id

  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // fetch the existing category data
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${URL}/blog/singleCategory/${id}`);
        console.log(response);
        setFormData({ name: response.data.name, image: response.data.image });
      } catch (err) {
        setError("Failed to load category data");
      }
    };

    fetchCategory();
  }, [id]);

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
      const response = await axios.put(
        `${URL}/blog/editCategory/${id}`,
        formData
      );
      setSuccess("Category updated successfully!");
    } catch (err) {
      setError("Failed to create update. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editCategory">
      <Sidebar />
      <div className="right">
        <Navbar />
        <div className="form-container">
          <h2>Edit Category</h2>
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
                required
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
              {loading ? "Saving Changes..." : "Edit Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;

import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import registerStyles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({ ...formData, [name]: value }); // Update the corresponding field in formData
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cPassword } = formData;
    if (password !== cPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/account/register`, {
        username,
        email,
        password,
      });
      //console.log(res.data); // log the response data
      setSuccess("Registeration successfully!");
      // UNSET error if any
      setError("");
      setLoading(false);
      // navigate("/login")
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed");
      }
      // unset success message if any
      setSuccess("");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Runway Riot | Register Page";
    document.body.classList.add(registerStyles["registerPage"]);
    // cleanup function to remove className when page unmounts
    return () => {
      document.body.classList.remove(registerStyles["registerPage"]);
    };
  }, []);
  return (
    <div className={`${registerStyles.formContainer}`}>
      <form className={`${registerStyles.form}`} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Enter Your Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Enter Your Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="cpPassword">Enter Your Confirm Password</label>
        <input
          type="password"
          name="cPassword"
          id="cPassword"
          value={formData.cPassword}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          className={`${appStyles.bgTangerineYellow} ${appStyles.textDark}`}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
        <Link to="/" className={`${registerStyles.goBack}`}>
          go back home
        </Link>
        <Link to="/login" className={`${registerStyles.login}`}>
          already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;

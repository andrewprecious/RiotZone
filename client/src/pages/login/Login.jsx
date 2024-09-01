import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import loginStyles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, error, loading, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await login(email, password);
  };

  useEffect(() => {
    if (!error && user) {
      navigate("/"); // Redirect to homepage after successful login
    }
  }, [error, user]);

  useEffect(() => {
    document.title = "Runway Riot | Login Page";
    document.body.classList.add(loginStyles["loginPage"]);
    // cleanup function to remove className when page unmounts
    return () => {
      document.body.classList.remove(loginStyles["loginPage"]);
    };
  }, []);
  return (
    <div className={`${loginStyles.formContainer}`}>
      <form className={`${loginStyles.form}`} onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Your Email</label>
        <input
          type="email"
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

        {error && <p className={loginStyles.error}>{error}</p>}
        <button
          className={`${appStyles.bgTangerineYellow} ${appStyles.textDark}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link
          to="/ "
          className={`${appStyles.textDark} ${appStyles.robotoRegular}`}
        >
          Go back home
        </Link>
        <Link
          to="/request-reset"
          className={`${appStyles.textDark} ${appStyles.robotoRegular}`}
        >
          forgotten password
        </Link>
      </form>
    </div>
  );
};

export default Login;

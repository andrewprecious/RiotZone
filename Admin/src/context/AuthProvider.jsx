import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext"; // Import AuthContext from its declaration file
import { URL } from "../App"; // Make sure URL is properly imported

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/account/login`, {
        email,
        password,
      });
      if (!response.data.isAdmin) {
        // If the user is not an admin, set an error message
        setError("You are not authorized to access the admin app.");
        setUser(null); // Ensure no user is set
      } else {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setError("");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

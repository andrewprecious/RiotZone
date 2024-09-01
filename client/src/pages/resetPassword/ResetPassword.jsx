import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./resetPassword.css";
import { URL } from "../../App";

import React from "react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/user/reset-password`, {
        token,
        password,
      });
      setMessage(response.data.message);
      setTimeout(
        () => navigate("/login"),

        2000
      );
    } catch (err) {
      setMessage(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <h2>Create New Password</h2>
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p className="reset-password-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;

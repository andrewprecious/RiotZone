import { useState } from "react";
import axios from "axios";
import "./requestReset.css";
import { URL } from "../../App";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${URL}/user/request-reset`, { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="request-reset-container">
      <form onSubmit={handleRequestReset} className="request-reset-form">
        <h2>Reset Password</h2>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {isLoading ? "Requesting..." : "Request Reset"}
        </button>
      </form>
      {message && <p className="request-reset-message">{message}</p>}
    </div>
  );
};

export default RequestReset;

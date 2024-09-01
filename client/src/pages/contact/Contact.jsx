import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import contactStyles from "./contact.module.css";
import axios from "axios";
import { URL } from "../../App";

const Contact = () => {
  const [name, setName] = useState("");

  const [subject, setSubject] = useState("");

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [responseMessage, setResponseMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Runway Riot | Contact Page";
    document.body.classList.add(contactStyles["contactPage"]);
    // cleanup function to remove className when page unmounts
    return () => {
      document.body.classList.remove(contactStyles["contactPage"]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, subject, email, message };
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/account/contact`, formData);
      console.log(response);

      if (response.status === 200) {
        setResponseMessage("Message sent Successfully!");
        setLoading(false);
      } else {
        setResponseMessage("Failed to send message. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setResponseMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={`${contactStyles.formContainer}`}>
      <form className={`${contactStyles.form}`} onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Fullname</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Enter Your Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="subject">Enter Subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label htmlFor="meassage">Leave a message</label>
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          className={`${appStyles.bgTangerineYellow} ${appStyles.textDark}`}
        >
          {loading ? "sending message..." : "Send Message"}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Contact;

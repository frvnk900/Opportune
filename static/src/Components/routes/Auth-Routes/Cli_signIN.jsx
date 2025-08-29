import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import logo from "../images/opport-logo-small.png";
import { Link } from "react-router-dom";

const ClientLogin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      client_email: emailOrUsername.includes("@") ? emailOrUsername : "",
      client_username: !emailOrUsername.includes("@") ? emailOrUsername : "",
      client_password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/clients/signin",
        payload
      );
      setMessage(response.data.message);
      setToken(response.data.token);

      // localStorage.removeItem("client_token");
      // localStorage.removeItem("token");
      localStorage.setItem("client_token", response.data.client_token);
      navigate("/clients/home");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="side-items">
        <img src={logo} width={340} height={224} />
        <h1 id="slogan">where skills meet opportunity.</h1>
      </div>
      <div className="client-signin-container">
        <h2>Client Sign In</h2>
        <form onSubmit={handleSubmit} className="client-signin-form">
          <ul>
            <li>
              {" "}
              <input
                type="text"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            <br></br>
            <li>
              {" "}
              <button type="submit" disabled={loading}>
                {loading ? "Signing you in..." : "Sign In"}
              </button>
            </li>
            <br></br>
          </ul>
        </form>

        {message && (
          <div style={{ marginTop: "1rem", color: token ? "green" : "red" }}>
            {message}
          </div>
        )}

        <p style={{ fontFamily: "sans-serif" }}>
          I don't  have an account,
          <Link to="/client/signup">Create account now</Link>
        </p>
      </div>
    </>
  );
};

export default ClientLogin;

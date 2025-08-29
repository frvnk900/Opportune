// src/pages/signin.jsx
import React, { useState } from "react";
import axios from "axios";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo2 from "../images/opport-logo-small.png";

const SignIn = () => {
  const [form, setForm] = useState({
    organisation_email: "",
    organisation_password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/organisation/signin",
        form
      );
      localStorage.removeItem("client_token");
      localStorage.removeItem("token");
      const { token } = res.data;
      localStorage.setItem("token", token);
      setMessage("Login successful!");
      navigate("/organisation/matching_center");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="side-items-signin">
        <img src={logo2} width={360} height={224} />
        <h1 id="slogan">where skills meet opportunity.</h1>
        <br></br> <br></br> <br></br> <br></br>
        <h2>
          My Organisation is`t registered <br />
          <Link to="/organisation/signup">Sign In</Link>
        </h2>
      </div>

      <div className="signin-container">
        <h1>Organisation Sign In</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <ul>
            <li>
              {" "}
              <input
                type="email"
                name="organisation_email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </li>
            <li>
              {" "}
              <br></br>
              <input
                type="text"
                name="organisation_password"
                placeholder="Password"
                onChange={handleChange}
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
          </ul>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default SignIn;

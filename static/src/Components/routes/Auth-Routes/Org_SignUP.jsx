// src/pages/signup.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo2 from "../images/opport-logo-small.png";

const SignUp = () => {
  const [form, setForm] = useState({
    organisation_name: "",
    organisation_email: "",
    organisation_password: "",
    organisation_phone: "",
    organisation_location: "",
    organisation_owner: "",
    orgnaisation_service: "",
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true); 
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (logo) {
      formData.append("organisation_logo", logo);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/organisation/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message || "Signup successful!");
      navigate("/organisation/signin");
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    } finally {
        setLoading(false); 
    }
  };
  return (
    <>
      <div className="side-items">
        <img src={logo2} width={340} height={224} />
               <h1 id="slogan">
        where skills meet opportunity.
      </h1>
        <h1>Organisation Sign Up</h1>
        <p>set up your organisation</p>
        <p>
          This will help Company/Organisation find you <br></br>are looking for.
        </p>
        <br></br>
        <br></br>
        <br />
        <h2>
          My Organisation is already registered <br />
         <Link to="/organisation/signin">Sign In</Link>
        </h2>
      </div>

      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <ul>
            <br></br>
            <li>
              <label htmlFor="file-input">
                <span>Logo +</span>
              </label>
            </li>
            <br></br>
            <li>
              <input
                name="organisation_name"
                placeholder="Organisation Name"
                onChange={handleChange}
                required
              />
            </li>{" "}
            <br></br>
            <li>
              <input
                name="organisation_email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="organisation_password"
                type="text"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="organisation_phone"
                type="number"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              {" "}
              <input
                name="organisation_location"
                placeholder="Location"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="organisation_owner"
                placeholder="Owner of your organisation"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="orgnaisation_type"
                type="text"
                placeholder="Service you provide"
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                id="file-input"
                onChange={handleFileChange}
              />{" "}
            </li>
            <li id="tandc">
              I have read and agreed to{" "}
              <Link to="/terms_and_conditions">Terms and Conditions</Link>.
            </li>
            <li>
              <br></br>
              <button type="submit" disabled={loading}>
                     {loading ? "Signing up..." : "Sign Up"}
              </button>
            </li>
          </ul>
        </form>
      </div>
      <p id="error">{message}</p>
    </>
  );
};

export default SignUp;

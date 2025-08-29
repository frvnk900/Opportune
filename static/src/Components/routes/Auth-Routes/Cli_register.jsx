import React, { useState } from "react";
import axios from "axios";
import "./auth.css";
import logo from "../images/opport-logo-small.png"
// import logo2 from "../images/opport-logo-small.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    client_email: "",
    client_name: "",
    client_username: "",
    client_description: "",
    client_age: "",
    client_profile: "",
    client_location: "",
    client_gender: "",
    client_languages: "",
    client_password: "",
    client_nationality: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (profileImage) {
      data.append("client_profile_image", profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/client/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message || "Signup successful");
      navigate("/client/signin");
      setFormData({
        client_email: "",
        client_name: "",
        client_username: "",
        client_description: "",
        client_age: "",
        client_profile: "",
        client_location: "",
        client_languages: "",
        client_password: "",
        client_nationality: "",
      });
      setProfileImage(null);
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
        <h1>Sign Up</h1>
        <p>set up your Account</p>
 
        <br></br>
        <br></br>
        <br />
        <h2>
          I  already have an account, <br />
          <Link to="/client/signin">Sign in now</Link>
        </h2>
      </div>
      <div className="client-signup-container">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="client-signup-form"
        >
          <ul className="client-left-inputs">
            <li>
              {" "}
              <textarea
                name="client_description"
                placeholder="Tell us who you are...."
                value={formData.client_description}
                onChange={handleChange}
                minLength={10}
                required
              />
            </li>
            <br></br>

            <li>
              {" "}
              <input
                name="client_languages"
                placeholder="Languages (comma-separated)"
                value={formData.client_languages}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>

            <ul className="drop-down-client">
              <li>
                <select
                  name="client_gender"
                  value={formData.client_gender}
                  onChange={handleChange}
                  required
                  style={{
                    marginBottom: "1rem",
                    //   width: "100%",
                    padding: "0.5rem",
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </li>

              <li>
                {" "}
                <select
                  style={{
                    marginBottom: "1rem",
                    //   width: "100%",
                    padding: "0.5rem",
                  }}
                  name="client_profile"
                  value={formData.client_profile}
                  onChange={handleChange}
                  required
                >
                  <option value="">Profile</option>
                  <option value="Student">Student</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Retired">Retired</option>
                  <option value="Employed">Employed</option>
                </select>
              </li>
            </ul>
            <li>
              {" "}
              <input
                name="client_nationality"
                placeholder="Nationality"
                value={formData.client_nationality}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
          </ul>
          <ul></ul>

          {/* right */}
          <ul className="client-right-inputs">
            <li>
              {" "}
              <label htmlFor="file-input">Profile image+</label>
            </li>
            <br></br>
            <li>
              <input
                name="client_name"
                placeholder="Name"
                value={formData.client_name}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="client_username"
                placeholder="Username"
                value={formData.client_username}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="client_age"
                type="text"
                placeholder="Age"
                value={formData.client_age}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="client_email"
                placeholder="Email"
                value={formData.client_email}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>

            <li>
              <input
                name="client_location"
                placeholder="Location"
                value={formData.client_location}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              <input
                name="client_password"
                type="text"
                placeholder="Password"
                value={formData.client_password}
                onChange={handleChange}
                required
              />
            </li>
            <br></br>
            <li>
              {" "}
              <button type="submit" disabled={loading}>
                {loading ? "Signing you up..." : "Sign Up"}
              </button>
            </li>
            <br></br>
          </ul>

          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            id="file-input"
            accept="image/*"
          />
        </form>

        {message && (
          <div
            className="error"
            style={{
              marginTop: "1rem",
              color: message.includes("success") ? "white" : "red",
              background: message.includes("success") ? "green" : "rgba(255, 0, 0, 0.082);",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default ClientSignup;

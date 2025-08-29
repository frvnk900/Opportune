import React, { useEffect, useState } from "react";
import axios from "axios";
import lang from "./icons/language.png";
import loc from "./icons/loctionn.png";
import gen from "./icons/gender.png";
import email from "./icons/email.png";
import "./chat.css";
import SideMenu from "../../MenuTamplate";

function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT:", e);
    return null;
  }
}

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("client_token");
    if (!token) {
      setError("No auth token found. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = decodeJWT(token);
    const clientId = decoded?.client_id;
    if (!clientId) {
      setError("Invalid token. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/clients/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClient(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (loading) return <p>Loading client data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <>
    <SideMenu/>
    <div className="client-profile-container">
      <ul className="profile-list">
        <li className="profile-row image-row">
          <img
            src={
              client.client_profile_image.startsWith("http") ||
              client.client_profile_image.startsWith("/")
                ? client.client_profile_image
                : `http://localhost:5000/uploads/${client.client_profile_image}`
            }
            alt="Profile"
            className="profile-pic"
            onError={(e) => (e.target.src = "/bid.png")}
          />
        </li>

        <li className="profile-row name-row">
          <h2>{client.client_name}</h2>
        </li>

        <li className="profile-row">
          <p><strong>Username:</strong> {client.client_username}</p>
        </li>

        <li className="profile-row">
          <img src={email} alt="Email" className="icon" />
          <p><strong>Email:</strong> {client.client_email}</p>
        </li>

        <li className="profile-row">
          <img src={gen} alt="Gender" className="icon" />
          <p><strong>Gender:</strong> {client.client_gender}</p>
        </li>

        <li className="profile-row">
          <img src={loc} alt="Location" className="icon" />
          <p><strong>Location:</strong> {client.client_location}</p>
        </li>

        <li className="profile-row">
          <img src={lang} alt="Languages" className="icon" />
          <p>
            <strong>Languages:</strong>{" "}
            {Array.isArray(client.client_languages)
              ? client.client_languages.join(", ")
              : client.client_languages || "N/A"}
          </p>
        </li>
      </ul>
    </div>
   </>
  );
};

export default ClientProfile;

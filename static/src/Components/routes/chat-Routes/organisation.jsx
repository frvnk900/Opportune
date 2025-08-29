import React, { useEffect, useState } from "react";
import axios from "axios";

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

function OrganisationProfile() {
  const [orgData, setOrgData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decodeJWT(token);

    if (!decoded?.organisation_id) {
      setError("Invalid token. Please log in again.");
      return;
    }

    const fetchOrganisation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/organisations/${decoded.organisation_id}`
        );
        setOrgData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load organisation data.");
      }
    };

    fetchOrganisation();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orgData) return <p>Loading organisation profile...</p>;

  return (
    
  <div className="org-profile"style={{ border: "1px solid #ccc", padding: 20, maxWidth: 300 }}>

    <h2>{orgData.organisation_name}</h2>
    {orgData.organisation_logo && (
      <img
        src={
          orgData.organisation_logo.startsWith("http") ||
          orgData.organisation_logo.startsWith("/")
            ? orgData.organisation_logo
            : `http://localhost:5000/uploads/${orgData.organisation_logo}`
        }
        alt="Organisation Logo"
        onError={(e) => (e.target.src = "/default_logo.png")}
      />
    )}
    <p><strong>Owner:</strong> {orgData.organisation_owner}</p>
    <p><strong>Type:</strong> {orgData.orgnaisation_type}</p>
    <p><strong>Email:</strong> {orgData.organisation_email}</p>
  </div>
);

  
}

export default OrganisationProfile;

import React, { useState } from "react";
import axios from "axios";
import "./chat.css";
import OrganisationMatches from "./OrgMatches";
import OrganisationProfile from "./organisation";
import lodin from "../images/send.gif"
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

export default function MatchOrganisationForm() {
  const [requestDescription, setRequestDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ decode once, at top
  const token = localStorage.getItem("token");
  const decoded = decodeJWT(token);
  const userId = decoded?.organisation_id;

  const validateRequest = () => {
    if (!requestDescription.trim()) {
      setError("Please describe the kind of person you're looking for.");
      return false;
    }
    if (requestDescription.length < 10) {
      setError("Description is too short. Try adding more detail.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!token) {
      setError("Authentication token is missing. Please sign in again.");
      setLoading(false);
      return;
    }

    if (!userId) {
      setError("Invalid or expired session. Please log in again.");
      setLoading(false);
      return;
    }

    if (!validateRequest()) {
      setLoading(false);
      return;
    }

    try {
      const url = `http://127.0.0.1:5000/organisations/${userId}/match`;
      const response = await axios.put(url, { request: requestDescription });

      if (response.status === 200) {
        setMessage("✔️ Match request submitted successfully.");
        setRequestDescription("");
      } else {
        setError("Unexpected server response. Please try again later.");
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const errMsg = err.response.data?.error;

        if (status === 400) {
          setError(errMsg || "Invalid request. Please check your input.");
        } else if (status === 404) {
          setError("Your organisation account could not be found.");
        } else {
          setError(errMsg || "Something went wrong. Please try again later.");
        }
      } else {
        setError("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Pass organisationId into OrganisationMatches */}
      {userId && <OrganisationMatches organisationId={userId} />}

      <div className="dashboard-container">
        {/* Left 40% Pane */}
        <div className="left-pane">
          <OrganisationProfile />
          <form onSubmit={handleSubmit} className="organisation_request_form">
            <div className="textarea-container">
              <textarea
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="Who are you looking for..."
                required
              />
              <button type="submit" disabled={loading} className="send-button">
                {loading ?  <img src={lodin}/> : "send"}
              </button>
            </div>
            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">⚠️ {error}</p>}
          </form>
        </div>

        {/* Right 60% Pane */}
        <div className="right-pane">
          <OrganisationMatches organisationId={userId} />
        </div>
      </div>
    </>
  );
}

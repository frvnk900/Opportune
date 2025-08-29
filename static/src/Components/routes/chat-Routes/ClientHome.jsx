import { useEffect, useState } from "react";
import axios from "axios";
import renderStarRating from "./rating";
import jwt_decode from "jwt-decode";
import bid from "./icons/buildings.png";
import { Link } from "react-router-dom";
import ClientProfile from "./client";
import opp from "../../Icons/logo/opport-logo-small.png"
import lang from "./icons/language.png";
import lod from "../../Icons/loading/loadind.gif"
import loc from "./icons/loctionn.png";
import reasonIcon from "./icons/reason.png";
import gen from "./icons/gender.png";
import emailIcon from "./icons/email.png";
import "./chat.css"; // Import the CSS

function ClientRecommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [orgDetails, setOrgDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeToken = (token) => {
    try {
      return jwt_decode(token).client_id;
    } catch {
      return null;
    }
  };

  const fetchOrgDetails = async (orgId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/organisations/${orgId}`
      );
      return res.data;
    } catch {
      return null;
    }
  };

  const fetchRecommendations = async (clientId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/clients/${clientId}/match`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("client_token")}`,
          },
        }
      );

      const recs = res.data.recommendations || [];
      setRecommendations(recs);

      const orgIds = new Set(recs.map((r) => r._id).filter(Boolean));
      const uniqueOrgIds = Array.from(orgIds);
      const orgs = await Promise.all(uniqueOrgIds.map(fetchOrgDetails));
      setOrgDetails(orgs.filter(Boolean));
    } catch (err) {
      setError("Failed to load recommendations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("client_token");
    if (!token) {
      setError("No token found.");
      setLoading(false);
      return;
    }
    const clientId = decodeToken(token);
    if (!clientId) {
      setError("Invalid token.");
      setLoading(false);
      return;
    }
    fetchRecommendations(clientId);
  }, []);

  const getOrgById = (id) =>
    orgDetails.find((o) => o.organisation_id === id || o._id === id);

if (loading) {
  return (
    <div className="fullscreen-loader">
      <img src={lod} width={120} alt="Loading..." /> <br />
      <img src={opp} />
    </div>
  );
}
  if (error) return <p className="error">{error}</p>;
  if (recommendations.length === 0) return <p>No recommendations yet...</p>;

  return (
    
    <div className="recommendation-wrapper">
        <Link to="/welcome" style={{textDecoration:"none", background:"orangered" , borderRadius:"10px" , padding:"10px"}}>Back</Link>
      <ClientProfile />
      <h2 className="recommendation-title">Recommended Organisations</h2>
      {recommendations.map((rec, idx) => {
        const org = getOrgById(rec._id);
        return (
          <div key={idx} className="client-recommendation-card">
            {org ? (
              <div className="client-box-reco">
                <div className="reco-img">
                  <img
                    src={
                      org.organisation_logo
                        ? `http://localhost:5000/uploads/${org.organisation_logo}`
                        : bid
                    }
                    alt={org.organisation_name || "Organisation logo"}
                    className="organisation-logo"
                  />
                </div>

                <div className="recommendation-info">
                  <h3>{org.organisation_name}</h3>

                  <p>
                    <img src={reasonIcon} alt="Reason" className="icon" />
                    {rec.reason}
                  </p>

                  {org.organisation_location && (
                    <p>
                      <img src={loc} alt="Location" className="icon" />
                      {org.organisation_location}
                    </p>
                  )}

                  {org.language && (
                    <p>
                      <img src={lang} alt="Language" className="icon" />
                      {org.language}
                    </p>
                  )}

                  {org.email && (
                    <p>
                      <img src={emailIcon} alt="Email" className="icon" />
                      {org.email}
                    </p>
                  )}

                  <p className="confidence">
                    {typeof rec.confidence_score === "number" &&
                      renderStarRating(rec.confidence_score)}
 
                  </p>
                  <button type="submit" className="apply-btn">
                    Apply
                  </button>
                </div>
              </div>
            ) : (
              <p>{rec.message || "No organisation data found."}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ClientRecommendation;

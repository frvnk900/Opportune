import React, { useEffect, useState } from "react";
import bid from "./icons/buildings.png";
import axios from "axios";
import renderStarRating from "./rating";
import lang from "./icons/language.png";
import loc from "./icons/loctionn.png";
import reason from "./icons/reason.png";
import gen from "./icons/gender.png";
import "./chat.css";
import { Link } from "react-router-dom";
import email from "./icons/email.png"
import status from "./icons/status.png"
import mainLooa from "../../Icons/loading/loadind.gif"

function OrganisationMatches({ organisationId }) {
  const [requests, setRequests] = useState([]);
  const [clientsMap, setClientsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await axios.get(
          `http://localhost:5000/organisations/${organisationId}/requests`
        );
        const orgRequests = reqRes.data || [];
        setRequests(orgRequests);

        const clientIds = Array.from(
          new Set(
            orgRequests.flatMap(
              (r) => r.recommendation?.map((m) => m.client_id) || []
            )
          )
        );

        const clientPromises = clientIds.map((id) =>
          axios.get(`http://localhost:5000/clients/${id}/requests`)
        );

        const clientResponses = await Promise.allSettled(clientPromises);
        const map = {};

        clientResponses.forEach((res) => {
          if (res.status === "fulfilled") {
            map[res.value.data.client_id] = res.value.data;
          }
        });
        setClientsMap(map);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to load matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organisationId]);

if (loading) {
  return (
    <div className="fullscreen-loader">
      <img src={mainLooa} alt="Loading..." />
    </div>
  );
}
  if (error) return <p className="error" style={{ color: "red" }}>{error}</p>;

  return (
    <div className="organisation-recommendation-container">
        <Link to="/welcome" style={{textDecoration:"none", background:"orangered" , borderRadius:"10px" , padding:"10px"}}>Back</Link>
      {requests.map((req) => (
        <div key={req.request_id} className="recommendation-box">
          <div className="request-info">
            <p><strong>{req.request}</strong></p>
            <br></br>
            <p>{req.request_duration}</p>
          </div>

          {req.recommendation.map((match, idx) => {
            if (match.client_id) {
              const client = clientsMap[match.client_id];
              return client ? (
                <div className="recommendation-content" key={match.client_id}>
                  <div className="recommendation-image">
                    <img
                      src={
                        client.client_profile_image?.startsWith("http") ||
                        client.client_profile_image?.startsWith("/")
                          ? client.client_profile_image
                          : `http://localhost:5000/uploads/${client.client_profile_image}`
                      }
                      alt={client.client_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = bid;  
                      }}
                    />
                  </div>

                  <div className="recommendation-details">
                    <p className="client-name">{client.client_name}</p>
                    <p><img src={email} /> {client.client_username}</p>
                    <p><img src={gen} alt="Gender" /> {client.client_gender}</p>
                    <p><img src={status} alt="Gender" /> {client.client_profile}</p>
                    <p><img src={lang} alt="Languages" /> {Array.isArray(client.client_languages)
                      ? client.client_languages.join(", ")
                      : client.client_languages || "N/A"}</p>
                    <p><img src={loc} alt="Location" /> {client.client_location}</p>
                    <div className="rating">
                      {typeof match.confidence_score === "number" && (
                        renderStarRating(match.confidence_score)
                      )}
                    </div>
                    <p><img src={reason} alt="Reason" /> {match.reason}</p>
                  
                  </div>

                </div>
              ) : (
                <p key={idx}>Client data not found for ID {match.client_id}</p>
              ); 
            } else if (match.message) {
              return (
                <p key={idx}>{match.message}</p>
              );
            } else if (match.error) {
              let userFriendlyError = match.error;
              if (match.error.includes("PromptTemplate is missing variables")) {
                userFriendlyError =
                  "⚠️ There was a problem processing this request. Please try again later.";
              }
              return (
                <p key={idx} style={{ color: "red" }}>{userFriendlyError}</p>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}

export default OrganisationMatches;

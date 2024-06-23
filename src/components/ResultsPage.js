import React from "react";
import { useLocation } from "react-router-dom";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const { userDetails } = location.state;

  return (
    <div className="results-page">
      <div className="user-details">
              <div className="user-card">
                  {console.log(userDetails)}
          <h2>{userDetails[0].handle}</h2>
          <p>Rank: {userDetails[0].rank || "N/A"}</p>
          <p>Rating: {userDetails[0].rating || "N/A"}</p>
        </div>
        <div className="vs">VS</div>
        <div className="user-card">
          <h2>{userDetails[1].handle}</h2>
          <p>Rank: {userDetails[1].rank || "N/A"}</p>
          <p>Rating: {userDetails[1].rating || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

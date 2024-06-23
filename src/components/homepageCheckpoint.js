import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [yourHandle, setYourHandle] = useState("");
  const [opponentHandle, setOpponentHandle] = useState("");
  const navigate = useNavigate();

  const handleFight = () => {
    if (yourHandle && opponentHandle) {
      navigate(
        `/versus?yourHandle=${yourHandle}&opponentHandle=${opponentHandle}`
      );
    }
  };

  return (
    <div className="home-page">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Enter the Fight Arena</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Your Handle"
            value={yourHandle}
            onChange={(e) => setYourHandle(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Opponent Handle"
            value={opponentHandle}
            onChange={(e) => setOpponentHandle(e.target.value)}
            className="input"
          />
          <button onClick={handleFight} className="fight-button">
            Fight
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

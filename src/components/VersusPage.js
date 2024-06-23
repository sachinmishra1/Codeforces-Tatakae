import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VersusPage.css";

const VersusPage = () => {
  const navigate = useNavigate();
    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const yourHandle = userDetails[0].handle;
  const opponentHandle = userDetails[1].handle;

  const [showVS, setShowVS] = useState(true);
  const [showBegin, setShowBegin] = useState(false);

  useEffect(() => {
    const vsTimer = setTimeout(() => {
      setShowVS(false);
      setShowBegin(true);
    }, 4000);

    const beginTimer = setTimeout(() => {
      navigate(
        `/battle`
      );
    }, 7000);

    return () => {
      clearTimeout(vsTimer);
      clearTimeout(beginTimer);
    };
  });

  return (
    <div className="versus-page">
      <div className="fighter top-left">
        <img
          src={userDetails[0].titlePhoto}
          alt="Your Avatar"
          className="avatar"
        />
        <h2>{yourHandle}</h2>
      </div>
      <div className="fighter bottom-right">
        <img
          src={userDetails[1].titlePhoto}
          alt="Opponent Avatar"
          className="avatar"
        />
        <h2>{opponentHandle}</h2>
      </div>
      {showVS && (
        <div className="versus">
          <h1>VS</h1>
        </div>
      )}
      {showBegin && (
        <div className="begin">
          <h1>Begin!</h1>
        </div>
      )}
    </div>
  );
};

export default VersusPage;

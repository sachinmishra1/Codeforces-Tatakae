import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import fetchAttemptedProblems from "../utils/fetchAttemptedProblems";

const HomePage = () => {
  const [yourHandle, setYourHandle] = useState("");
  const [opponentHandle, setOpponentHandle] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!yourHandle || !opponentHandle) {
      alert("Please enter both usernames.");
      return;
    }

    const userDetails = await fetchUserDetails([yourHandle, opponentHandle]);

    if (userDetails) {
      if (rememberMe) {
        localStorage.setItem("cf-users", `${yourHandle};${opponentHandle}`);
      } else {
        localStorage.removeItem("cf-users");
      }
      
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      const yourProblems = await fetchAttemptedProblems(yourHandle);
      const opponentProblems = await fetchAttemptedProblems(opponentHandle);

      if (yourProblems && opponentProblems) {
        localStorage.setItem("yourProblems", JSON.stringify(yourProblems));
        localStorage.setItem(
          "opponentProblems",
          JSON.stringify(opponentProblems),
        );
        // navigate("/results", { state: { userDetails } });
        navigate(
          `/versus`,
        );
      }
    }
  };

  const fetchUserDetails = async (usernames) => {
    const user_info_url = "https://codeforces.com/api/user.info?handles=";
    const errors = [];
    const userDetails = [];

    for (let username of usernames) {
      try {
        const response = await fetch(user_info_url + username);
        const data = await response.json();
        if (data.status === "FAILED") {
          errors.push(`User with handle ${username} not found!`);
        } else {
          userDetails.push(data.result[0]);
        }
      } catch (error) {
        errors.push(`Error fetching data for ${username}`);
      }
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return null;
    }

    return userDetails;
  };

  return (
    <div className="home-page">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Enter the Fight Arena</h1>
        <form onSubmit={handleSubmit}>
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
            <input type="submit" className="submit-button" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember_me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember_me">Remember Me?</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;

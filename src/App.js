import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VersusPage from "./components/VersusPage";
import BattlePage from "./components/BattlePage";
import ResultsPage from "./components/ResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/versus" element={<VersusPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React, { useState } from "react";
// import ContestList from "./components/ContestList";

// const App = () => {
//   const [usernames, setUsernames] = useState(["Flamense160", "rockxxy"]);

//   return (
//     <div>
//       <ContestList usernames={usernames} />
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TWP from "./screens/TWP";
import Certificate from "./screens/Certificate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TWP />} />
        <Route path="/:certificate" element={<Certificate />} />
      </Routes>
    </Router>
  );
};

export default App;

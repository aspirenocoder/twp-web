import React from "react";
import Become from "./Become";
import Unicom from "./Unicom";

import { useParams } from "react-router-dom";

const Certificate = () => {
  const { certificate } = useParams();

  const NotFound = () => {
    return (
      <div>
        <h1>The certificate you are looking for is not available</h1>
      </div>
    );
  };

  if (certificate === "Become-2024") {
    return (
      <Become />
    )
  }
  if (certificate === "Unicom-2025") {
    return (
      <Unicom />
    )
  }
  return <div><NotFound /></div>;
};

export default Certificate;

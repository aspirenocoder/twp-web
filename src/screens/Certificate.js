import React from "react";
import Become from "./Become";
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
  return <div>{certificate === "Become-2024" ? <Become /> : <NotFound />}</div>;
};

export default Certificate;

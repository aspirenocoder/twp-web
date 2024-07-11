import React, { useEffect, useState } from "react";

const TWP = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`/twp.html`)
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => console.error("Error loading HTML:", error));
  }, []);

  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="/twp.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="HTML Renderer"
      />
    </div>
  );
};

export default TWP;

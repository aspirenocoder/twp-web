import React from "react";

const Mobile = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
                width: "100vw",
                flexDirection: "column",
            }}
        >
            <img
                alt="mobile-unresponsiveness"
                src={require("../assets/desktop-res.gif")}
                style={{ width: "320px", height: "200px" }}
            />

            <p style={{ textAlign: "center" }}>
                Please open this platform in desktop
            </p>
        </div>
    );
};

export default Mobile;

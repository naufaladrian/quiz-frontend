import React from "react";
import Star from "../../assets/star-bg/Star";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <>
      <Star />
      <main style={{ flexDirection: "column" }}>
        <button type="button" className="back-button" onClick={back}>
          &larr; Home
        </button>
        <h1 style={{ color: "white", fontSize: "100px" }}>404</h1>
        <p style={{ color: "white", fontSize: "40px" }}>Page Not Found</p>
      </main>
    </>
  );
}

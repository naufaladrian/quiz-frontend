import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const MiddleWare = () => {
  console.log(window.location.pathname);
  if (
    localStorage.getItem("adminId") &&
    (window.location.pathname === "/admin" ||
      window.location.pathname === "/edit-question")
  ) {
    console.log("admin");
  } else {
    console.log("user");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

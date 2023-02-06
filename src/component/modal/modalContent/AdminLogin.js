import React, { useState } from "react";
import close from "../../../assets/icon/close.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminLogin({ closeAdmin }) {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const axiosPostAdminLogin = async () => {
    try {
      const adminLogin = await axios.post("/v1/api/user/admin/login", {
        password: password,
        username: username,
      });
      localStorage.setItem("adminId", adminLogin.data.data.userId.id);
      localStorage.setItem("schoolId", adminLogin.data.data.userId.schoolId.id);
      sessionStorage.setItem("token", adminLogin.data.data.token);
      // console.log(username + " " + password);
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username/Password Salah !",
      });
    }
  };
  const loginAdmin = () => {
    axiosPostAdminLogin();
  };

  return (
    <>
      <img
        src={close}
        alt="close"
        className="close-button"
        onClick={closeAdmin}
      />
      <h1>Admin Login</h1>
      <form id="admin-form">
        <label>Username :</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <label>Password :</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="button" onClick={loginAdmin}>
          Login
        </button>
      </form>
    </>
  );
}

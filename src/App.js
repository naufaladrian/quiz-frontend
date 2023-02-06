import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.scss";
import Question from "./pages/question/Question";
import Finish from "./pages/finish/Finish";
import AdminPage from "./pages/admin/AdminPage";
import EditQuestion from "./pages/editQuestion/EditQuestion";
import NotFound from "./pages/404/NotFound";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editProfile } from "./store/dataSlice";
import Swal from "sweetalert2";
import { MiddleWare } from "./MiddleWare";
import NewQuestion from "./pages/editQuestion/NewQuestion";
axios.interceptors.response.use(undefined, async (res) => {
  if (res.response.status === 401) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your session has timed out!",
    });
    if (localStorage.getItem("id")) {
      const resp = await axios.get(
        "/v1/api/traffic-global-user/connect?userId=" +
          localStorage.getItem("id")
      );
      sessionStorage.setItem("token", resp.data.data.token);
    } else {
      const resp = await axios.get("/v1/api/traffic-global-user/connect");
      sessionStorage.setItem("token", resp.data.data.token);
      localStorage.setItem("id", resp.data.data.userId.id);
    }
    window.location.reload();
  }
});
function App() {
  const dispatch = useDispatch();

  const getConnect = async () => {
    if (localStorage.getItem("id")) {
      const resp = await axios.get(
        "/v1/api/traffic-global-user/connect?userId=" +
          localStorage.getItem("adminId")
          ? localStorage.getItem("adminId")
          : localStorage.getItem("id")
      );
      sessionStorage.setItem("token", resp.data.data.token);
    } else {
      const resp = await axios.get("/v1/api/traffic-global-user/connect");
      sessionStorage.setItem("token", resp.data.data.token);
      localStorage.setItem("id", resp.data.data.userId.id);
    }
    fetchProfile();
  };

  useEffect(() => {
    if (sessionStorage.getItem("first_access")) {
      fetchProfile();
      return;
    }
    sessionStorage.setItem("first_access", true);
    getConnect();
  }, []);

  const fetchProfile = async () => {
    const profile = await axios.get("/v1/api/user", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    console.log(profile);
    dispatch(editProfile({ profile: profile.data.data }));
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route element={<MiddleWare />}> */}
          <Route path="/question" element={<Question />} />
          <Route path="/congrates/:materiId" element={<Finish />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit-question/:materiId" element={<EditQuestion />} />
          <Route path="/new-question" element={<NewQuestion />} />
          <Route path="*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

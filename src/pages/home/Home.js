import React, { useState, useEffect } from "react";
import mute_volume from "../../assets/icon/volume-mute.svg";
import person from "../../assets/icon/person-circle.svg";
import "./HomeStyle.scss";
import Star from "../../assets/star-bg/Star.js";
import Modal from "../../component/modal/Modal";
import PilihSekolah from "../../component/modal/modalContent/PilihSekolah";
import Profile from "../../component/modal/modalContent/Profile";
import AdminLogin from "../../component/modal/modalContent/AdminLogin";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editProfile } from "../../store/dataSlice";
import PilihMateri from "../../component/modal/modalContent/PilihMateri";

function Home() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.data);
  const [ispopup, setPopup] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [materiModal, setMateriModal] = useState(false);
  const [schoolName, setSchoolName] = useState("");

  const getSchoolName = async () => {
    const schName = await axios.get("/v1/api/user", {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    });
    setSchoolName(schName.data.data.schoolId.name);
  };
  const closeModal = () => {
    setPopup(false);
    setProfileActive(false);
    setAdminModal(false);
    setMateriModal(false);
  };
  const editDataProfile = async (username, email, urlProfile) => {
    const respons = await axios.put(
      "/v1/api/user",
      {
        email: email,
        urlProfile: urlProfile,
        username: username,
      },
      {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }
    );
    dispatch(editProfile({ profile: respons.data.data }));
  };
  const getListMateri = async () => {
    const listMateri = await axios.get("/v1/api/question/materi", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    setMateri(listMateri.data.data);
    console.log(materi);
    setMateriModal(true);
  };
  const [materi, setMateri] = useState([]);

  useEffect(() => {
    getSchoolName();
  }, []);

  return (
    <>
      <Star />
      <main>
        <img src={mute_volume} alt="off-vol" className="speaker-icon" />
        <img
          src={person}
          alt="profile"
          className="profile-icon"
          onClick={() => setProfileActive(true)}
        />
        <div className="intro-text">
          <h1>Quizzz</h1>
          <p>
            Quizz, Laman Web Yang Menyediakan Kumpulan Kuis Untuk Mengasah
            Kemampuanmu!
          </p>
          <button
            onClick={() => {
              localStorage.getItem("schoolId")
                ? getListMateri()
                : setPopup(true);
            }}
          >
            Mulai Bermain
          </button>
        </div>
        <div className="foot-text">
          <p className="admin-login" onClick={() => setAdminModal(true)}>
            Admin Login
          </p>
          <p>&#169;Copyrights{new Date().getFullYear()}</p>
          <p className="join-partner">Join Partner School</p>
        </div>
        <Modal popupControl={ispopup} closePopup={closeModal}>
          <PilihSekolah closeModal={closeModal} />
        </Modal>
        <Modal popupControl={profileActive} closePopup={closeModal}>
          <Profile
            closeProfile={closeModal}
            username={profile.username}
            school={
              localStorage.getItem("schoolId") ? schoolName : "belum terdaftar"
            }
            email={profile.email ? profile.email : "belum terdaftar"}
            img={profile.urlProfile}
            userId={profile.id}
            editProfile={editDataProfile}
          />
        </Modal>
        <Modal popupControl={adminModal} closePopup={closeModal}>
          <AdminLogin closeAdmin={closeModal} />
        </Modal>
        <Modal popupControl={materiModal} closePopup={closeModal}>
          <PilihMateri closeMateri={closeModal} materiData={materi} />
        </Modal>
      </main>
    </>
  );
}
export default Home;

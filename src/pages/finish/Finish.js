import React, { useState, useEffect } from "react";
import Star from "../../assets/star-bg/Star";
import "./FinishStyle.scss";
import person from "../../assets/icon/person-circle.svg";
import camera from "../../assets/icon/camera.svg";
import Modal from "../../component/modal/Modal";
import Profile from "../../component/modal/modalContent/Profile";
import leftCongrates from "../../assets/img/cetak2.png";
import midCongrates from "../../assets/img/cetak.png";
import rightCongrates from "../../assets/img/cetak3.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Finish() {
  const [profileActive, setProfileActive] = useState(false);
  const [score, setscore] = useState({});
  const closeProfile = () => {
    setProfileActive(false);
  };
  const { materiId } = useParams();
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  const axiosScore = async () => {
    console.log(materiId);
    // const onlyId = materiId.substring(7);
    const score = await axios.get("/v1/api/user-score/" + materiId, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    });
    setscore(score.data.data);
  };

  useEffect(() => {
    axiosScore();
  }, []);

  return (
    <>
      <Star />
      <main className="finish-flex">
        <img
          src={person}
          alt="profile"
          className="profile-icon"
          onClick={() => setProfileActive(true)}
        />
        <img src={camera} alt="camera" className="photo" />
        <div className="congrats">
          <img src={leftCongrates} alt="left" className="img-left"></img>
          <img src={midCongrates} alt="mid" className="img-mid"></img>
          <img src={rightCongrates} alt="right" className="img-right"></img>
        </div>
        <p className="congrats-text">
          Selamat kepada "{score?.userId?.username}" anda telah menyelesaikan
          kuis ini dengan skor
          <span
            className="score"
            style={
              score?.score > 50 ? { color: "lightgreen" } : { color: "red" }
            }
          >
            {" "}
            {score?.score}
          </span>
        </p>
        <button className="back-home-button" onClick={home}>
          Kembali ke Beranda
        </button>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <Modal popupControl={profileActive}>
          <Profile closeProfile={closeProfile} />
        </Modal>
      </main>
    </>
  );
}

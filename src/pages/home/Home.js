import React, { useState } from "react";
import mute_volume from "../../assets/icon/volume-mute.svg";
import person from "../../assets/icon/person-circle.svg";
import "./HomeStyle.scss";
import Star from "../../assets/star-bg/Star.js";
import Modal from "../../component/modal/Modal";
import PilihSekolah from "../../component/modal/modalContent/PilihSekolah";
import Profile from "../../component/modal/modalContent/Profile";
function Home() {
  const [ispopup, setPopup] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const closeModal = () => {
    setPopup(false);
  };
  const closeProfile = () => {
    setProfileActive(false);
  };
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
          <button onClick={() => setPopup(true)}>Mulai Bermain</button>
        </div>
        <div className="foot-text">
          <p>Admin Login</p>
          <p>&#169;Copyrights{new Date().getFullYear()}</p>
          <p>Join Partner School</p>
        </div>
        <Modal popupControl={ispopup}>
          <PilihSekolah closeModal={closeModal} />
        </Modal>
        <Modal popupControl={profileActive}>
          <Profile closeProfile={closeProfile} />
        </Modal>
      </main>
    </>
  );
}
export default Home;

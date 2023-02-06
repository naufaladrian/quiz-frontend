import React, { useState, useEffect } from "react";
import Star from "../../assets/star-bg/Star.js";
import "./AdminPageStyle.scss";
import Modal from "../../component/modal/Modal";
import EditSchool from "../../component/modal/modalContent/EditSchool";
import PilihMateri from "../../component/modal/modalContent/PilihMateri.js";
import Chart from "../../component/Chart.js";
import axios from "axios";

export default function AdminPage() {
  const [schoolData, setSchoolData] = useState({});
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };
  const [materi, setMateri] = useState(false);
  const closeMateri = () => {
    setMateri(false);
  };

  const axiosGetSchoolById = async () => {
    const schoolById = await axios.get(
      "/v1/api/school/" + localStorage.getItem("schoolId"),
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    setSchoolData(schoolById.data.data);
  };

  useEffect(() => {
    axiosGetSchoolById();
    console.log(schoolData);
  }, []);

  return (
    <>
      <Star />
      <main>
        <p className="school-name">{schoolData.name}</p>
        <p className="school-id">id:{schoolData.id}</p>
        <p className="address">address : {schoolData.address}</p>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <p className="date">
          {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear()}
        </p>
        <div className="admin-left">
          <div className="kepala-sekolah">
            <p>Kepala Sekolah :</p>
            <p>{schoolData.headMaster}</p>
          </div>
          <div className="phone">
            <p>Phone :</p>
            <p>{schoolData.phoneNumber}</p>
          </div>
          <div className="butt-groub">
            <button className="edit-profile" onClick={() => setModal(true)}>
              Edit Profile
            </button>
            <br />
            <button className="edit-question" onClick={() => setMateri(true)}>
              Edit Question
            </button>
          </div>
        </div>
        <div className="admin-right">
          <Chart />
        </div>
        <Modal popupControl={modal}>
          <EditSchool closeModal={closeModal} getSchool={axiosGetSchoolById} />
        </Modal>
        <Modal popupControl={materi}>
          <PilihMateri closeMateri={closeMateri} />
        </Modal>
      </main>
    </>
  );
}

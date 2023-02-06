import React, { useState, useEffect } from "react";
import close from "../../../assets/icon/close.svg";
import axios from "axios";
import Swal from "sweetalert2";

export default function PilihSekolah({ closeModal }) {
  const getSchoolList = async () => {
    const schoolList = await axios.get("/v1/api/school/list", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    setSchool(schoolList.data.data);
    console.log(school);
  };
  const [school, setSchool] = useState([]);

  const schoolId = (id) => {
    if (!alert) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih Sekolah!",
      });
      return;
    }
    const userId = localStorage.getItem("id");
    closeModal();
    localStorage.setItem("schoolId", id);
    axios.put(
      "/v1/api/user/" + userId + "/update-school/" + id,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  };
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    getSchoolList();
  }, []);
  return (
    <>
      <img
        src={close}
        alt="close"
        className="close-button"
        onClick={closeModal}
      />
      <h1>Pilih Sekolah</h1>
      <div id="list-sekolah-container">
        {school.map((e, i) => {
          return (
            <div
              className="list-sekolah-item"
              onClick={() => {
                schoolId(e.id);
              }}
              key={i}
            >
              <h2>{e.name}</h2>
            </div>
          );
        })}
      </div>
      <button type="submit" className="pilih">
        Pilih Acak
      </button>
      <form>
        <input
          type="checkbox"
          id="agreement"
          className="agreement"
          onChange={(e) => {
            setAlert(e.target.value);
          }}
          value={alert}
        />
        <label for="agreement">Setuju dengan Syarat dan Ketentuan</label>
      </form>
    </>
  );
}

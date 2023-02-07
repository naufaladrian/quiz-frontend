import React, { useEffect, useState } from "react";
import close from "../../../assets/icon/close.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PilihMateri({ closeMateri }) {
  const navigate = useNavigate();
  const getListMateri = async () => {
    const listMateri = await axios.get("/v1/api/question/materi", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    setMateri(listMateri.data.data);
    console.log(materi);
  };
  const [materi, setMateri] = useState([]);

  const tabQuest = (id, alreadyAnswer) => {
    const paramObj = { materi: id };
    const searchParam = new URLSearchParams(paramObj);
    if (localStorage.getItem("adminId")) {
      navigate("/edit-question/" + id);
    } else {
      alreadyAnswer
        ? navigate("/congrates/" + id)
        : navigate("/question?" + searchParam.toString());
    }
  };
  useEffect(() => {
    setTimeout(getListMateri(), 500);
  }, []);

  return (
    <>
      <img
        src={close}
        alt="close"
        className="close-button"
        onClick={closeMateri}
      />
      <h1>Pilih Materi</h1>
      <div id="list-materi-container">
        {materi.length ? (
          materi.map((e, i) => {
            return (
              <div
                className="list-materi-item"
                onClick={() => {
                  tabQuest(e.id, e.alreadyAnswer);
                }}
                key={i}
              >
                <h2>{e.name}</h2>
                <h3>
                  {localStorage.getItem("adminId")
                    ? ""
                    : e.alreadyAnswer
                    ? "✅"
                    : ""}
                </h3>
              </div>
            );
          })
        ) : (
          <h1>Materi Tidak Tersedia</h1>
        )}
      </div>
      {localStorage.getItem("adminId") ? (
        <button
          type="submit"
          className="pilih"
          onClick={() => navigate("/new-question")}
        >
          Tambah Materi
        </button>
      ) : (
        ""
      )}
    </>
  );
}

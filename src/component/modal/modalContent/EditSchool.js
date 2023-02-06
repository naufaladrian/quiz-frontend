import React, { useState } from "react";
import close from "../../../assets/icon/close.svg";
import axios from "axios";

export default function EditSchool({ closeModal, getSchool }) {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [headMaster, setHeadMaster] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const axiosEditSchool = async () => {
    await axios.put(
      "/v1/api/school/" + localStorage.getItem("schoolId"),
      {
        address: address,
        headMaster: headMaster,
        name: name,
        phoneNumber: phoneNumber,
      },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    getSchool();
  };

  const submit = () => {
    axiosEditSchool();
    closeModal();
  };
  return (
    <>
      <img
        src={close}
        alt="close"
        className="close-button"
        onClick={closeModal}
      />
      <h1>Edit Data Sekolah</h1>
      <form id="school-form">
        <label>Nama Sekolah :</label>
        <input
          type="text"
          placeholder="Nama Sekolah"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Kepala Sekolah :</label>
        <input
          type="text"
          placeholder="Kepala Sekolah"
          onChange={(e) => {
            setHeadMaster(e.target.value);
          }}
        />
        <label>Phone :</label>
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <label>Address :</label>
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button type="button" onClick={submit}>
          Simpan
        </button>
      </form>
    </>
  );
}

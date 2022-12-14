import React from "react";
import close from "../../../assets/icon/close.svg";

export default function PilihSekolah({ closeModal }) {
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
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
        <div className="list-sekolah-item">
          <h2>SMA Nusantara</h2>
        </div>
      </div>
      <button type="submit" className="pilih">
        Pilih Sekolah
      </button>
      <form>
        <input
          type="checkbox"
          id="agreement"
          className="agreement"
          value="agree"
        />
        <label for="agreement">Setuju dengan Syarat dan Ketentuan</label>
      </form>
    </>
  );
}

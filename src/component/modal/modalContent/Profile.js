import React from "react";
import close from "../../../assets/icon/close.svg";
export default function Profile({ closeProfile }) {
  return (
    <>
      <img
        src={close}
        alt="close"
        className="close-button"
        onClick={closeProfile}
      />
      <div className="profile-cont">
        <div className="prof-img">
          <img
            src="https://phlearn.com/wp-content/uploads/2019/03/dhruv-deshmukh-266273-unsplash-square.jpg"
            alt="profile"
            className="profile-pict"
          />
        </div>
        <table className="profile-right" style={{ textAlign: "start" }}>
          <tr>
            <td>Username</td>
            <td>: guest</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: mail@gmail.com</td>
          </tr>
          <tr>
            <td>Point</td>
            <td>: 100</td>
          </tr>
        </table>
      </div>
      <p className="id-user">id: 1n;p521o51'491291205287j</p>
    </>
  );
}

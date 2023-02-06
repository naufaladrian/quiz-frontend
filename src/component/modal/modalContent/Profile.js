import React, { useState, useEffect } from "react";
import axios from "axios";
import close from "../../../assets/icon/close.svg";
export default function Profile({
  closeProfile,
  username,
  email,
  urlProfile,
  school,
  userId,
  editProfile,
}) {
  const [isEdit, setEdit] = useState(false);
  const [newProfile, setNewProfile] = useState({
    username: "",
    email: "",
    urlProfile: "",
  });

  const submit = () => {
    if (isEdit === false) {
      setEdit(true);
      return;
    }
    editProfile(newProfile.username, newProfile.email, newProfile.urlProfile);
    setEdit(false);
  };
  useEffect(() => {
    setNewProfile({ username: username, email: email, urlProfile: urlProfile });
  }, [username, email, urlProfile]);

  const axiosImgToLink = async (img) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", img);
    const linkImage = await axios.post("/api/image", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setNewProfile({ ...newProfile, urlProfile: linkImage.data.data });
  };
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
            // src="https://phlearn.com/wp-content/uploads/2019/03/dhruv-deshmukh-266273-unsplash-square.jpg"
            src={
              newProfile.urlProfile
                ? newProfile.urlProfile
                : "https://phlearn.com/wp-content/uploads/2019/03/dhruv-deshmukh-266273-unsplash-square.jpg"
            }
            alt="profile"
            className="profile-pict"
          />
          {isEdit ? (
            <form className="uploadfile-wrapper">
              <label htmlFor="choose-img">
                <p>Choose image</p>
              </label>
              <input
                type="file"
                id="choose-img"
                onChange={(e) => axiosImgToLink(e.target.files[0])}
              />
            </form>
          ) : (
            ""
          )}
        </div>
        <table className="profile-right" style={{ textAlign: "start" }}>
          <thead></thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td>: </td>
              <td>
                {isEdit ? (
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        username: e.target.value,
                      })
                    }
                    value={newProfile.username}
                  />
                ) : (
                  username
                )}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: </td>
              <td>
                {isEdit ? (
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, email: e.target.value })
                    }
                    value={newProfile.email}
                  />
                ) : (
                  email
                )}
              </td>
            </tr>
            {!isEdit && (
              <tr>
                <td>School</td>
                <td>: </td>
                <td>{school}</td>
              </tr>
            )}
            <tr>
              <td>
                <button onClick={submit}>
                  {isEdit ? "Submit" : "Edit Profile"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="id-user">id: {userId}</p>
    </>
  );
}

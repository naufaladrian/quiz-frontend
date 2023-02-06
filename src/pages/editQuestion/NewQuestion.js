import React, { useEffect, useState } from "react";
import Star from "../../assets/star-bg/Star";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditQuestionStyle.scss";
import image_processing from "../../assets/gif/image_processing.gif";
import no_image from "../../assets/icon/no-image-available.jpg";

export default function NewQuestion() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1, { replace: true });
  };

  const [questNum, setQuestNum] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [quizTeacher, setQuizTeacher] = useState("");
  const [questionData, setQuestionData] = useState([
    {
      image: "",
      question: "Tulis Pertanyaan Disini !",
      answerList: ["A", "B", "C", "D"],
    },
  ]);
  const [questionActive, setQuestionActive] = useState({
    image: "",
    question: "",
    answerList: [],
  });
  const chooseQuestion = (i) => {
    setQuestNum(i + 1);
    setQuestionActive(questionData[i]);
  };

  const addQuestion = () => {
    setQuestionData((questionData) => [
      ...questionData,
      {
        answerList: ["A", "B", "C", "D"],
        answerTrue: "A",
        image: "",
        question: "tulis pertanyaanmu disini...!",
      },
    ]);
  };
  const deleteQuestion = () => {
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    arrQuest.splice([questNum - 1], 1);
    setQuestNum(0);
  };

  const deleteImage = () => {
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    console.log(arrQuest[questNum - 1]);
    arrQuest[questNum - 1].image = "";
  };

  const editQuestion = (e) => {
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    console.log(arrQuest[questNum - 1]);
    arrQuest[questNum - 1].question = e;
  };
  const editAnswer = (e, i) => {
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    console.log(arrQuest[questNum - 1].answerList);
    arrQuest[questNum - 1].answerList[i] = e;
  };

  const axiosImgToLink = async (img) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", img);
    const linkImage = await axios.post("/api/image", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    console.log(arrQuest[questNum - 1]);
    arrQuest[questNum - 1].image = linkImage.data.data;
  };
  const axiosCreateQuiz = async () => {
    await axios.post(
      "/v1/api/question/" + localStorage.getItem("schoolId"),
      {
        description: "This is " + quizName + " quiz",
        name: quizName,
        questions: questionData.map((e) => ({
          ...e,
          listAnswer: e.answerList,
          answerTrue: e.answerList[0],
        })),
        teacher: quizTeacher,
      },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  };

  return (
    <>
      <Star />
      <main>
        <button type="button" className="back-button" onClick={back}>
          &larr; Kembali
        </button>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <p className="question-title">Question-{questNum}</p>
        <p className="page-view">View :3</p>
        <div className="limit-question">
          <p>Limit Question</p>
          <p className="limit">{questNum}/0</p>
        </div>
        <div className="quest-edit-flex">
          <div id="list-question-container">
            <label htmlFor="nama-materi">Nama Materi :</label>
            <input
              id="nama-materi"
              type="text"
              onChange={(e) => setQuizName(e.target.value)}
            />
            <label htmlFor="nama-guru">Nama Guru :</label>
            <input
              id="nama-guru"
              type="text"
              onChange={(e) => setQuizTeacher(e.target.value)}
            />
            <hr style={{ marginBottom: "10px", width: "100%" }} />
            {questionData.map((e, i) => (
              <div
                className="list-question-item"
                onClick={() => chooseQuestion(i)}
                key={i}
              >
                <h2>Question {i + 1}</h2>
              </div>
            ))}
          </div>
          <div className="question-container-edit">
            <div className="question-content">
              <div className="question-image">
                {questNum ? (
                  <form className="uploadfile-wrapper">
                    <label htmlFor="add">
                      <p>Tambah</p>
                    </label>
                    <input
                      required="true"
                      type="file"
                      id="add"
                      className="add"
                      onChange={(e) => axiosImgToLink(e.target.files[0])}
                    />
                    <button type="reset" onClick={deleteImage}>
                      Hapus
                    </button>
                  </form>
                ) : (
                  ""
                )}
                <img
                  src={
                    !questNum
                      ? image_processing
                      : questionActive.image
                      ? questionActive.image
                      : no_image
                  }
                  alt="question"
                />
              </div>
              {questNum ? (
                <input
                  type="text"
                  className="input-question"
                  value={questionActive.question}
                  onChange={(e) => editQuestion(e.target.value)}
                />
              ) : (
                ""
              )}
            </div>
            {questNum ? (
              <p>Masukkan Jawaban Benar Pada Kotak Berwarna Hijau!</p>
            ) : (
              ""
            )}
            <div className="answer-container">
              {questionActive.answerList.map((item, i) => (
                <div
                  className="answer-item"
                  style={{ backgroundColor: i === 0 ? "rgb(74, 172, 74)" : "" }}
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => editAnswer(e.target.value, i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="add-question">
            <button className="add" onClick={addQuestion}>
              Add
            </button>
            <br />
            <button className="delete-question" onClick={deleteQuestion}>
              Delete
            </button>
            <br />
            <button className="save" onClick={axiosCreateQuiz}>
              Create Quiz
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

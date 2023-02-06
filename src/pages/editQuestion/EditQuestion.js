import React, { useEffect, useState } from "react";
import Star from "../../assets/star-bg/Star";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditQuestionStyle.scss";
import image_processing from "../../assets/gif/image_processing.gif";
import no_image from "../../assets/icon/no-image-available.jpg";

export default function EditQuestion() {
  const { materiId } = useParams();
  const [activeAnswerList, setActiveAnswerList] = useState([]);
  const [questNum, setQuestNum] = useState(0);
  const [materiData, setMateriData] = useState({});
  const [questionData, setQuestionData] = useState([
    {
      id: "",
      image: "",
      question: "",
      answerList: [],
    },
  ]);
  const [questionActive, setQuestionActive] = useState({
    id: "",
    image: "",
    question: "",
    answerList: [],
  });

  const navigate = useNavigate();
  const back = () => {
    navigate(-1, { replace: true });
  };

  const axiosGetMateri = async () => {
    const getMateri = await axios.get(
      "/v1/api/question/" + materiId + "/admin",
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    setMateriData(getMateri.data.data);
    setQuestionData(getMateri.data.data.questions);
  };

  const chooseQuestion = (i) => {
    setQuestNum(i + 1);
    setQuestionActive(questionData[i]);
    setActiveAnswerList(questionData[i].answerList);
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

  const editImage = (img) => {
    axiosImgToLink(img);
    console.log(img);
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

  const deleteImage = () => {
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    console.log(arrQuest[questNum - 1]);
    arrQuest[questNum - 1].image = "";
  };

  const deleteQuestion = async () => {
    await axios.delete("/v1/api/question/delete/" + questionActive.id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    const arrQuest = [...questionData];
    setQuestionData(arrQuest);
    arrQuest.splice([questNum - 1], 1);
    setQuestionActive({});
    setActiveAnswerList([]);
    setQuestNum(0);
  };

  const editQuizName = (value) => {
    setMateriData({ name: value });
  };
  const editTeacherName = (value) => {
    setMateriData({ teacher: value });
  };

  const axiosEditMateri = async () => {
    console.log(questionActive);
    console.log(questionData);
    console.log(materiData);
    questionData.map((e) => console.log(e.answerList));
    axios.put(
      "/v1/api/question/" + materiId,
      {
        description: "This is " + materiData.name + " quiz",
        name: materiData.name,
        questions: questionData.map((e) => ({
          ...e,
          listAnswer: e.answerList,
          answerTrue: e.answerList[0],
        })),
        teacher: materiData.teacher,
      },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  };
  useEffect(() => {
    axiosGetMateri();
  }, []);
  return (
    <>
      <Star />
      <main>
        <button type="button" className="back-button" onClick={back}>
          &larr; Kembali
        </button>
        <p className="school-id">id: {materiId}</p>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <p className="question-title">Question-{questNum ? questNum : "0"}</p>
        <p className="page-view">View :3</p>
        <div className="limit-question">
          <p>Limit Question</p>
          <p className="limit">
            {questNum ? questNum : "0"}/{questionData.length}
          </p>
        </div>
        <div className="quest-edit-flex">
          <div id="list-question-container">
            <label htmlFor="nama-materi">Nama Materi :</label>
            <input
              id="nama-materi"
              type="text"
              value={materiData.name}
              onChange={(e) => editQuizName(e.target.value)}
            />
            <label htmlFor="nama-guru">Nama Guru :</label>
            <input
              id="nama-guru"
              type="text"
              value={materiData.teacher}
              onChange={(e) => editTeacherName(e.target.value)}
            />
            <hr style={{ marginBottom: "10px", width: "100%" }} />
            {questionData.map((e, i) => (
              <div
                className="list-question-item"
                key={i}
                onClick={() => chooseQuestion(i)}
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
                      onChange={(e) => editImage(e.target.files[0])}
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
                  value={questionActive.question}
                  className="input-question"
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
              {activeAnswerList.map((item, i) => (
                <div
                  className="answer-item"
                  style={{ backgroundColor: i === 0 ? "rgb(74, 172, 74)" : "" }}
                >
                  <input
                    type="text"
                    key={i}
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
            <button className="save" onClick={axiosEditMateri}>
              Create Quiz
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

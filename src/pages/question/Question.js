import React, { useEffect, useState } from "react";
import Star from "../../assets/star-bg/Star";
import "./QuestionStyle.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export default function Question() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [materiName, setMateriName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(1);
  const [questionActive, setQuestionActive] = useState({
    id: "",
    image: "",
    question: "",
    answerList: [],
  });

  // answer question
  const [answerArr, setAnswerArr] = useState([]);
  const back = () => {
    navigate(-1, { replace: true });
  };
  const toHome = async () => {
    const param = new URLSearchParams(window.location.search);
    const materiParam = param.get("materi");
    if (!materiParam) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Materi atau Pertanyaan Tidak Tersedia!",
      });
      navigate("/");
    } else {
      const getQuestion = await axios.get(
        "/v1/api/question/" + materiParam + "/user",
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      setQuestions(getQuestion.data.data.questions);
      const editQuestion = {
        ...getQuestion.data.data.questions[0],
        answerList: getQuestion.data.data.questions[0].answerList.map((e) => ({
          name: e,
          active: false,
        })),
      };
      console.log(editQuestion);
      setMateriName(getQuestion.data.data.name);
      setQuestionActive(editQuestion);
      console.log(questions[0]);
    }
  };
  const nextQuestion = async () => {
    const param = new URLSearchParams(window.location.search);
    const materiParam = param.get("materi");
    const tempAnswer = questionActive.answerList.find((e) => e.active == true);

    if (tempAnswer) {
      setAnswerArr(
        answerArr.concat({
          answer: tempAnswer.name,
          questionId: questionActive.id,
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Soal Belum Dijawab!",
      });
    }

    // console.log(answerArr);
    const idx = questionIndex + 1;
    setQuestionIndex(idx);
    if (questions.length - idx < 0) {
      console.log(answerArr);
      try {
        await axios.post(
          "/v1/api/question/" + materiParam + "/answer",
          answerArr,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        navigate("/congrates/" + materiParam);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Jawaban Tidak Dapat Dikirim!",
        });
      }

      return;
    }
    const editQuestion = {
      ...questions[questionIndex],
      answerList: questions[questionIndex].answerList.map((e) => ({
        name: e,
        active: false,
      })),
    };
    console.log(editQuestion);
    setQuestionActive(editQuestion);
  };

  const changeAnswer = (i) => {
    const list = [...questionActive.answerList];
    list.forEach((e) => (e.active = false));
    list[i].active = true;
    setQuestionActive({ ...questionActive, answerList: list });
  };

  useEffect(() => {
    toHome();
  }, []);
  return (
    <>
      <Star />
      <main>
        <button type="button" className="back-button" onClick={back}>
          &larr; Home
        </button>
        <p className="nama-materi">{materiName}</p>
        <button type="button" className="answer-button" onClick={nextQuestion}>
          Lanjut &rarr;
        </button>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <div className="num-question-left">
          <p>
            {questions.length - questionIndex ? (
              <span>{questions.length - questionIndex} Left</span>
            ) : (
              <span>soal terakhir</span>
            )}
          </p>
        </div>
        <div className="question-container">
          <div className="question-content">
            <div className="question-image">
              <img
                src="https://phlearn.com/wp-content/uploads/2019/03/dhruv-deshmukh-266273-unsplash-square.jpg"
                alt="question"
              />
            </div>
            <p>{questionActive?.question}</p>
          </div>
          <div className="answer-container">
            {questionActive?.answerList.map((e, i) => {
              return (
                <button
                  className={!e.active ? "answer-item" : "answer-active"}
                  key={i}
                  onClick={() => {
                    changeAnswer(i);
                  }}
                >
                  {e.name}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

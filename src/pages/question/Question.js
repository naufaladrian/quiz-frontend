import React from "react";
import Star from "../../assets/star-bg/Star";
import "./QuestionStyle.scss";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <Star />
      <main>
        <button type="button" className="back-button" onClick={back}>
          &larr; Kembali
        </button>
        <button type="button" className="answer-button">
          Lanjut &rarr;
        </button>
        <p className="cpy">&#169;Copyrights{new Date().getFullYear()}</p>
        <div className="num-question-left">
          <p>
            <span>8</span> Left
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
            <p>Hasil dari ∫ ( 2 x 3 − 9 x 2 + 4 x − 5 ) d x = ⋯</p>
          </div>
          <div className="answer-container">
            <button className="answer-item">A</button>
            <button className="answer-item">B</button>
            <button className="answer-item">C</button>
            <button className="answer-item">D</button>
          </div>
        </div>
      </main>
    </>
  );
}

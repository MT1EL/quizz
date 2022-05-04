import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Quizz({ selects, data, formik }) {
  const [selected, setSelected] = useState();

  const [points, setPoints] = useState(0);
  const [showPoint, setShowPoint] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [disableAnswers, setDisableAnswers] = useState(false);
  const [shuffeldAnswers, setShuffeldAnswers] = useState();
  const { amount } = formik.values;

  /* ============================
    ===sets Answer options=======
    =============================
    */

  useEffect(() => {
    let newARR = [
      ...data.results[questionIndex].incorrect_answers,
      data.results[questionIndex].correct_answer,
    ];

    setShuffeldAnswers(newARR.sort((a, b) => 0.5 - Math.random()));
  }, [questionIndex]);
  if (!shuffeldAnswers) {
    return <h1>Loading...</h1>;
  }

  /* ==============
    ===makes sure in question not gonna be some weird symbols==
    =================
    */
  const qusetion = data.results[questionIndex].question
    .replace(/&quot;/gi, "")
    .replace(/#039;/gi)
    .replace(/&/gi, "")
    .replace(/undefineds/gi, "");

  /* ==============
    ===Answers Array==
    =================
    */

  /*
  ==============================
  ====displays next question====
  ==============================
*/

  const handleClicK = () => {
    setQuestionIndex(questionIndex + 1);
    setShowAnswer(false);
    setDisableAnswers(false);
    setSelected(null);
  };
  /*
  ==============================
  ===giving styles to buttons===
  ==============================
*/

  const handleSelect = (item) => {
    if (
      selected === item &&
      selected === data.results[questionIndex].correct_answer
    ) {
      return "correct";
    } else if (
      selected === item &&
      selected !== data.results[questionIndex].correct_answer
    ) {
      return "wrong";
    } else if (
      showAnswer &&
      item === data.results[questionIndex].correct_answer
    ) {
      return "correct";
    }
  };

  /*
  ==============================
  ===checks if answer is right==
  ==============================
*/

  const checkAnswer = (answer) => {
    if (data.results[questionIndex].correct_answer === answer) {
      if (showAnswer) {
      } else {
        setPoints(points + 1);
      }
    }
    if (amount - questionIndex === 1) {
      setShowPoint(true);
    }
    setSelected(answer);
    setShowAnswer(true);
    setDisableAnswers(true);
  };

  return (
    <>
      <div className="question-container">
        <div className="title">
          <h2>{qusetion}</h2>
        </div>
        <div className="answers">
          {shuffeldAnswers.map((item, id) => (
            <button
              key={id}
              onClick={() => checkAnswer(item)}
              className={`answer ${handleSelect(item)}`}
              disabled={disableAnswers}
            >
              {item}
            </button>
          ))}
        </div>
        <h1
          onClick={() => {
            questionIndex < amount - 1 && handleClicK();
          }}
          className="nextQuestion"
        >
          next Question
        </h1>
        <h1>
          Your Point: {points} / {questionIndex + 1}
        </h1>
        {showPoint && (
          <div className="total">
            <h1>Your Total Point Is: {points}</h1>
            <Link to="/">
              <button className="start">Start again</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Quizz;

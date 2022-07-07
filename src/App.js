import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { InstructionModal } from "./components/InstructionModal/InstructionModal";
import { AppReducer, initialState } from "./reducers/AppReducer";
import {
  ACTIONS,
  ALPHABETS,
  initVal,
  KEY,
  MAX_SCORE,
  PENALTY,
  SUCCESS_MESSAGE,
} from "./utils/constants";
import { getRandomChar } from "./utils/getRandomChar";
import { isBestScore } from "./utils/isBestScore";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { userInput, alphabet, timer, correctlyAnswered, bestScore } = state;

  const timerId = useRef(null);

  const countDown = () => {
    dispatch({ type: ACTIONS.SetTimer });
    timerId.current = setTimeout(() => countDown(), 10);
  };

  const stopCountDown = () => {
    clearTimeout(timerId.current);
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    /* return if the entered key is not a single alphabet or is 
    a non-alphabet or user has already given all answers */
    if (
      key.length >= 2 ||
      key.charCodeAt(0) < 65 ||
      key.charCodeAt(0) > 90 ||
      correctlyAnswered >= 20
    )
      return;

    // else set the input and update the alphabet and score
    stopCountDown();
    countDown();
    dispatch({ type: ACTIONS.SetInput, payload: { userInput: key } });
    if (key === alphabet) {
      dispatch({
        type: ACTIONS.SetNextAlphabet,
        payload: { alphabet: getRandomChar(ALPHABETS) },
      });
    } else {
      dispatch({ type: ACTIONS.SetPenalty, payload: { penalty: PENALTY } });
    }
  };

  const handleReset = () => {
    stopCountDown();
    dispatch({
      type: ACTIONS.Reset,
      payload: { timer: { ...initVal }, alphabet: getRandomChar(ALPHABETS) },
    });
  };

  useEffect(() => {
    setShowModal(true);
    dispatch({
      type: ACTIONS.SetInitivalValue,
      payload: {
        alphabet: getRandomChar(ALPHABETS),
        bestScore: JSON.parse(localStorage.getItem(KEY)) || { ...initVal },
        timer: { ...initVal },
      },
    });

    return () => stopCountDown();
  }, []);

  useEffect(() => {
    console.log("here");
    if (correctlyAnswered >= MAX_SCORE) {
      stopCountDown();
      if (isBestScore(timer, bestScore)) {
        dispatch({
          type: ACTIONS.SetBestScore,
          payload: { alphabet: SUCCESS_MESSAGE, bestScore: timer },
        });
        localStorage.setItem(KEY, JSON.stringify(timer));
      }
    }
  }, [correctlyAnswered]);

  return (
    <>
      <InstructionModal showModal={showModal} setShowModal={setShowModal} />
      <section className="type-container">
        <header className="type-header">
          <h2>Type The Alphabet</h2>
          <p className="text-light">
            Typing game to see how fast you can type. Give it a try!
          </p>
        </header>
        <div className="alphabet-output">{alphabet}</div>
        <div className="type-timer">
          <p className="text-bold">
            Time: &nbsp; {timer.seconds}.{timer.milliSeconds <= 9 && "0"}
            {timer.milliSeconds}s
          </p>
          <p className="text-light">
            Best Score: &nbsp;{bestScore?.seconds}.
            {bestScore.milliSeconds <= 9 && "0"}
            {bestScore?.milliSeconds}s!
          </p>
        </div>
        <div className="input-grp">
          <input type="text" value={userInput} onKeyDown={handleKeyDown} />
          <button className="btn secondary" onClick={handleReset}>
            reset
          </button>
        </div>
      </section>
    </>
  );
}

export default App;

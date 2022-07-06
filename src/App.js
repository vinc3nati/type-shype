import { useEffect, useRef, useState } from "react";
import "./App.css";
import { InstructionModal } from "./components/InstructionModal/InstructionModal";
import { ALPHABET, KEY } from "./utils/constants";
import { getRandomChar } from "./utils/getRandomChar";

function App() {
  const initVal = {
    seconds: 0,
    milliSeconds: 0,
  };
  const [input, setInput] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [timer, setTimer] = useState(initVal);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  const [bestScore, setBestScore] = useState({});
  const [showModal, setShowModal] = useState(false);

  const timerId = useRef(null);
  const MAX_SCORE = 20;

  const countDown = () => {
    setTimer((prev) =>
      prev.milliSeconds >= 99
        ? { seconds: prev.seconds + 1, milliSeconds: 0 }
        : { ...prev, milliSeconds: prev.milliSeconds + 1 }
    );
    timerId.current = setTimeout(() => countDown(), 10);
  };

  const stopCountDown = () => {
    clearTimeout(timerId.current);
  };

  const isBestScore = (score1, score2) => {
    if (score2.seconds === 0 && score2.milliSeconds === 0) return true;
    if (score1.seconds < score2.seconds) return true;
    if (
      score1.seconds === score2.seconds &&
      score1.milliSeconds < score2.milliSeconds
    )
      return true;

    return false;
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    // return if the entered key is not a single alphabet or is a non-alphabet
    if (key.length >= 2 || key.charCodeAt(0) < 65 || key.charCodeAt(0) > 90)
      return;

    // else set the input and update the alphabet and score
    clearTimeout(timerId.current);
    countDown();
    setInput((prev) => prev + key.toUpperCase());
    if (key === alphabet) {
      setAlphabet(getRandomChar(ALPHABET));
      setCorrectlyAnswered((prev) => prev + 1);
    } else {
      setTimer((prev) => ({ ...prev, milliSeconds: prev.milliSeconds + 50 }));
    }
  };

  const handleClick = () => {
    stopCountDown();
    setTimer(initVal);
    setAlphabet(getRandomChar(ALPHABET));
    setInput("");
    setCorrectlyAnswered(0);
  };

  useEffect(() => {
    setShowModal(true);
    setBestScore(JSON.parse(localStorage.getItem(KEY)) || initVal);
    setAlphabet(getRandomChar(ALPHABET));

    return () => stopCountDown();
  }, []);

  useEffect(() => {
    if (correctlyAnswered >= MAX_SCORE) {
      stopCountDown();
      if (isBestScore(timer, bestScore)) {
        setAlphabet("Success!");
        setBestScore(timer);
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
            Best Score: &nbsp;{bestScore?.seconds}.{bestScore?.milliSeconds}s!
          </p>
        </div>
        <div className="input-grp">
          <input type="text" value={input} onKeyDown={handleKeyDown} />
          <button className="btn secondary" onClick={handleClick}>
            reset
          </button>
        </div>
      </section>
    </>
  );
}

export default App;

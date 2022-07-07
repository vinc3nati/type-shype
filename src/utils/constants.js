const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const initVal = {
  seconds: 0,
  milliSeconds: 0,
};

const KEY = "TYPE_SHYPE";

const MAX_SCORE = 20;

const INSTRUCTIONS = [
  "There are total 20 Alphabets you need to type correctly",
  "Timer starts automatically on typing",
  "For every incorrect alphabet type, penalty is 0.5s",
  "Only alphabets are accepted as inputs",
  '"Reset" allows you to make a fresh start',
];

const PENALTY = 50;

const SUCCESS_MESSAGE = "Success!";

const ACTIONS = {
  SetInput: "SET_INPUT",
  SetTimer: "SET_TIMER",
  SetInitivalValue: "SET_INITIAL_VALUES",
  SetBestScore: "SET_BEST_SCORE",
  SetNextAlphabet: "SET_NEXT_ALPHABET",
  SetPenalty: "SET_PENALTY",
  Reset: "RESET",
};

export {
  ALPHABETS,
  initVal,
  KEY,
  MAX_SCORE,
  INSTRUCTIONS,
  PENALTY,
  SUCCESS_MESSAGE,
  ACTIONS,
};

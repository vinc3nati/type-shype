import { ACTIONS } from "../utils/constants";

export const initialState = {
  userInput: "",
  alphabet: "",
  timer: {},
  correctlyAnswered: 0,
  bestScore: {},
};

export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SetInitivalValue:
      return {
        ...state,
        bestScore: payload.bestScore,
        alphabet: payload.alphabet,
        timer: payload.timer,
      };

    case ACTIONS.SetInput:
      return { ...state, userInput: state.userInput + payload.userInput };

    case ACTIONS.SetNextAlphabet:
      return {
        ...state,
        alphabet: payload.alphabet,
        correctlyAnswered: state.correctlyAnswered + 1,
      };

    case ACTIONS.SetPenalty:
      return {
        ...state,
        timer: {
          ...state.timer,
          milliSeconds: state.timer.milliSeconds + payload.penalty,
        },
      };

    case ACTIONS.SetTimer:
      return {
        ...state,
        timer:
          state.timer.milliSeconds >= 99
            ? { seconds: state.timer.seconds + 1, milliSeconds: 0 }
            : { ...state.timer, milliSeconds: state.timer.milliSeconds + 1 },
      };

    case ACTIONS.SetBestScore:
      return {
        ...state,
        alphabet: payload.alphabet,
        bestScore: payload.bestScore,
      };

    case ACTIONS.Reset:
      return {
        ...initialState,
        bestScore: state.bestScore,
        timer: payload.timer,
        alphabet: payload.alphabet,
      };

    default:
      return state;
  }
};

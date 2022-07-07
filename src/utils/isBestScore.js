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

export { isBestScore };

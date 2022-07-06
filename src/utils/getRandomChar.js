const getRandomChar = (alphabets) => {
  return alphabets.charAt(Math.floor(Math.random() * 26));
};

export { getRandomChar };

export const createNumbersArray = (from, to) => {
  const numsArr = [];
  for (let i = from; i <= to; i += 1) {
    numsArr.push(i);
  }
  return numsArr;
};

export const formatNumberUtils = (number) => {
  const rounded = Number(number.toFixed(2));
  return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toString();
};

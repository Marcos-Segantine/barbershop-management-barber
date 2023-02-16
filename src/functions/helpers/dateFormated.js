export const dateFormated = shedulesUser => {
  if (!shedulesUser) return;
  return shedulesUser.day.split('-').reverse().join('/ ');
};

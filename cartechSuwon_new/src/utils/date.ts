const date = new Date();

export const today =
  date.getFullYear() +
  '-' +
  (date.getMonth() + 1).toString().padStart(2, '0') +
  '-' +
  date.getDate().toString().padStart(2, '0');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertDate = (date) => {
  date = new Date(date);
  return (
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
  );
};

export const returnDateOfBook = (date) => {
  const currDate = new Date(date);
  currDate.setMonth(currDate.getMonth() + 1);

  return convertDate(currDate);
};

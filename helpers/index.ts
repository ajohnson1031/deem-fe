import dayjs from "dayjs";

const capitalize = (str: string) => {
  return str.replace(/^./, (match) => match.toUpperCase());
};

const getDateParts = (dateTime: string) => {
  const [date, time] = dayjs(dateTime).format("MMM. DD, YYYY|h:ssa").split("|");
  return [date, time];
};

export { capitalize, getDateParts };

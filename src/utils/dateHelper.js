import { handleError } from "../handlers/handleError";

export const getDay = (scheduleInfo, setSomethingWrong) => {
  try {

    // If don't have scheduleInfo return the current day
    if (typeof scheduleInfo === "undefined") return String(new Date().getDate())

    if (scheduleInfo?.day !== undefined) return scheduleInfo.day.slice(8)
    return scheduleInfo.split("").slice(8).join("")

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getDay", message);
  }
};

export const getHour = (scheduleInfo, setSomethingWrong) => {
  try {
    return scheduleInfo?.schedule || scheduleInfo;

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getHour", message)
  }
};

export const getMonth = (scheduleInfo, setSomethingWrong) => {
  try {
    const [year, month] = scheduleInfo?.day?.split('-') || scheduleInfo.split('-')
    return month;

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getMonth", message)
  }
};

export const getYear = (scheduleInfo, setSomethingWrong) => {
  try {
    return scheduleInfo?.day?.slice(0, 4) || scheduleInfo.slice(0, 4)

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getYear", message)
  }
};

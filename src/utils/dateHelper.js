export const getDay = (scheduleInfo) => {
  try {

    // If don't have scheduleInfo return the current day
    if (typeof scheduleInfo === "undefined") return String(new Date().getDate())

    if (scheduleInfo?.day !== undefined) return scheduleInfo.day.slice(8)
    return scheduleInfo.split("").slice(8).join("")

  } catch (error) {
    // console.log(error);
  }
};

export const getHour = (scheduleInfo) => {
  return scheduleInfo?.schedule || scheduleInfo;
};

export const getMonth = (scheduleInfo) => {
  const [year, month] = scheduleInfo?.day?.split('-') || scheduleInfo.split('-')
  return month;
};

export const getProfessional = (scheduleInfo) => {
  return scheduleInfo?.professional || scheduleInfo;
};

export const getYear = (scheduleInfo) => {
  return scheduleInfo?.day?.slice(0, 4) || scheduleInfo.slice(0, 4)
};

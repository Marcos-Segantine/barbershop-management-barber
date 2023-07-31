export const getDay = (scheduleInfo) => {
  return scheduleInfo?.day?.slice(8) || scheduleInfo.slice(8)
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

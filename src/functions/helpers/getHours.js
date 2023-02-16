export const getHour = shedulesUser => {
    const hour = shedulesUser?.shedule;
  
    return hour !== undefined ? hour : null;
  };
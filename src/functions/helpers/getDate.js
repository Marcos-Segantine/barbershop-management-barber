export const getDay = (shedulesUser) => {
    const day = shedulesUser?.day?.split("").slice(8).join("");

    return day !== undefined ? day : null
}

export const getHour = shedulesUser => {
    const hour = shedulesUser?.shedule;

    return hour !== undefined ? hour : null;
};

export const getMonth = (scheduleUser) => {
    const month = scheduleUser.day.split("").slice(5, 7).join("");

    return month
}

export const getProfessional = (shedulesUser) => {
    const professional = shedulesUser?.professional;

    return professional !== undefined ? professional : null
}


export const getYear = shedulesUser => {
    return shedulesUser.day.slice(0, 4);
};

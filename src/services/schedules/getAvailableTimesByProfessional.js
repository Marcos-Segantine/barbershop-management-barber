import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';
import { getCurrentHour } from '../../utils/getCurrentHour';

export const getAvailableTimesByProfessional = async (
    professionalUid,
    scheduleInfo,
    setIsLoading
) => {
    setIsLoading(true)

    try {

        const year = getYear(scheduleInfo);
        const month = getMonth(scheduleInfo);
        const day = getDay(scheduleInfo);

        const CurrentDayWeek = new Date(scheduleInfo.day).getDay() + 1
        const weekday = CurrentDayWeek <= 5 ? "weekday" : CurrentDayWeek === 6 ? "saturday" : "sunday"

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)

        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()[weekday]
        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()

        const currentMonth = new Date().getMonth() + 1;
        const currentDay = new Date().getDate();
        const currentDate = Number(currentDay) === Number(day) && Number(currentMonth) === Number(month)

        const currentHour = getCurrentHour()

        // if professional or day selected don't have any schedule, return all times because he is free
        if (!unavailableTimesData) return workingHoursData
        else if (!unavailableTimesData[day] && currentDate || unavailableTimesData[day] && currentDate) {
            return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour) && !unavailableTimesData[day][professionalUid].includes(schedule))
        }
        else if (!unavailableTimesData[day]?.[professionalUid] && currentDate) return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour))

        else if (!unavailableTimesData[day]) return workingHoursData
        else if (!unavailableTimesData[day][professionalUid]) return workingHoursData

        const dataTemp = workingHoursData.filter(schedule => {
            return !unavailableTimesData[day][professionalUid].includes(schedule)
        })

        return dataTemp;

    } catch (error) {
        console.error(error);
    }
};

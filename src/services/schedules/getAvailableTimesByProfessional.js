import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';

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
        const blockedTimesRef = firestore().collection('blocked_times').doc(professionalUid)

        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()[weekday]
        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()
        const blockedTimesData = (await blockedTimesRef.get({ source: "server" })).data()

        const date = new Date()
        const currentMonth = +date.getMonth() + 1;
        const currentDay = +date.getDate();
        const currentHour = +date.getHours()
        const currentDate = +currentDay === +day && +currentMonth === +month

        const daysWithTimesBlocked = blockedTimesData === undefined ? null : Object.keys(blockedTimesData)
        const currentDayHasBlockedTime = daysWithTimesBlocked === null ? null : daysWithTimesBlocked.includes(scheduleInfo.day)

        const unavailableTimes = (time) => {
            // Returns `true` if the time is available

            return !unavailableTimesData[day][professionalUid].includes(time)
        }

        const blockedTimes = (time) => {
            // Returns `true` if the time is available
            // Returns `false` if the time is blocked

            return !blockedTimesData[scheduleInfo.day].includes(time)
        }

        const unavailableTimesCurrentDays = (time) => {
            // Returns `true` if the time is available

            time = +time.split(":")[0]
            return time >= currentHour
        }

        // if professional or day selected don't have any schedule, return all times because he is free
        if (!unavailableTimesData) return workingHoursData

        else if (unavailableTimesData[day] === undefined && currentDate && currentDayHasBlockedTime)
            return workingHoursData.filter(time => {
                return unavailableTimesCurrentDays(time) && blockedTimes(time)
            })

        else if (unavailableTimesData[day] === undefined && currentDate)
            return workingHoursData.filter(time => {
                return unavailableTimesCurrentDays(time)
            })

        else if (unavailableTimesData[day] === undefined)
            return workingHoursData

        else if (unavailableTimesData[day][professionalUid] === undefined && currentDate && currentDayHasBlockedTime)
            return workingHoursData.filter(time => {
                return unavailableTimesCurrentDays(time) && blockedTimes(time)
            })

        else if (unavailableTimesData[day][professionalUid] === undefined && currentDate)
            return workingHoursData.filter(time => {
                return unavailableTimesCurrentDays(time)
            })

        else if (unavailableTimesData[day][professionalUid] === undefined && currentDayHasBlockedTime)
            return workingHoursData.filter(time => {
                return blockedTimes(time)
            })

        else if (unavailableTimesData[day][professionalUid] === undefined)
            return workingHoursData

        else if (unavailableTimesData[day][professionalUid] && currentDate && currentDayHasBlockedTime)
            return workingHoursData.filter(time => {
                return unavailableTimes(time) && unavailableTimesCurrentDays(time) && blockedTimes(time)
            })

        else if (unavailableTimesData[day][professionalUid] && currentDate)
            return workingHoursData.filter(time => {
                return unavailableTimes(time) && unavailableTimesCurrentDays(time)
            })

        else if (unavailableTimesData[day][professionalUid] && currentDayHasBlockedTime)
            return workingHoursData.filter(time => {
                return unavailableTimes(time) && blockedTimes(time)
            })

        else if (unavailableTimesData[day][professionalUid])
            return workingHoursData.filter(time => {
                return unavailableTimes(time)
            })

    } catch (error) {
        console.error(error);
    }
};

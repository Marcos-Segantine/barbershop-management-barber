import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth } from '../helpers/getDate';

export const getScheduleByDateAndHour = async (isScheduleFree, user, hour, route) => {

    const daySchedule = getDay(route.params)
    const monthSchedule = getMonth(route.params)
    const yearSchedule = getYear(route.params)

    if (!isScheduleFree) {
        const schedulesMonthRef = firestore().collection("schedules_month").doc(`${monthSchedule}_${yearSchedule}`)
        const schedulesMonthData = await (await schedulesMonthRef.get()).data()[daySchedule][user.name][hour]

        return schedulesMonthData
    }
};
import firestore from '@react-native-firebase/firestore';
import { getDay } from '../helpers/getDay';
import { getMonth } from '../helpers/getMonth';
import { getYear } from '../helpers/getYear';

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
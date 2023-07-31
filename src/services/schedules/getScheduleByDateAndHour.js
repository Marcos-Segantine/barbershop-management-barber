import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth } from '../../utils/dateHelper';

export const getScheduleByDateAndHour = async (isScheduleFree, barberName, hour, date, setSomethingWrong) => {
    try {

        if (isScheduleFree) return

        const daySchedule = getDay(date)
        const monthSchedule = getMonth(date)
        const yearSchedule = getYear(date)

        const schedulesMonthRef = firestore().collection("schedules_month").doc(`${monthSchedule}_${yearSchedule}`)
        const schedulesMonthData = await (await schedulesMonthRef.get()).data()[daySchedule][barberName][hour]

        return schedulesMonthData

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
};

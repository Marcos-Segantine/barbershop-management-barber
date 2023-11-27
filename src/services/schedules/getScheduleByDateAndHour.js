import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth } from '../../utils/dateHelper';

import { handleError } from '../../handlers/handleError';

export const getScheduleByDateAndHour = async (isScheduleFree, professionalUid, hour, date, setSomethingWrong) => {
    try {

        if (isScheduleFree) return

        const daySchedule = getDay(date, setSomethingWrong)
        const monthSchedule = getMonth(date, setSomethingWrong)
        const yearSchedule = getYear(date, setSomethingWrong)

        const schedulesMonthRef = firestore().collection("schedules_month").doc(`${monthSchedule}_${yearSchedule}`)
        const schedulesMonthData = await (await schedulesMonthRef.get()).data()[daySchedule][professionalUid][hour]

        return schedulesMonthData

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getScheduleByDateAndHour", message)
    }
};

import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';

export const getNumberOfSchedules = async (professionalUid, date) => {
    try {

        const day = getDay(date)
        const month = getMonth(date)
        const year = getYear(date)

        const schedulesMonthRef = firestore().collection("schedules_month").doc(`${month}_${year}`)
        const schedulesMonthData = (await schedulesMonthRef.get()).data()

        const numberOfSchedules = Object.keys(schedulesMonthData[day][professionalUid])

        return numberOfSchedules.length

    } catch (error) {
        console.log(error);
    }
}
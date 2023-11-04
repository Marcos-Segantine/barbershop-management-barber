import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';

export const getNumberOfSchedules = async (professionalUid, date, setSomethingWrong) => {
    try {

        const day = getDay(date, setSomethingWrong)
        const month = getMonth(date, setSomethingWrong)
        const year = getYear(date, setSomethingWrong)

        const schedulesMonthRef = firestore().collection("schedules_month").doc(`${month}_${year}`)
        const schedulesMonthData = (await schedulesMonthRef.get()).data()

        const numberOfSchedules = Object.keys(schedulesMonthData[day][professionalUid])

        return numberOfSchedules.length

    } catch ({ message }) {
        console.log(error);
    }
}
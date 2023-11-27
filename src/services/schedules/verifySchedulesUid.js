import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const verifySchedulesUid = async (scheduleMonth, scheduleUid, setSomethingWrong) => {
    try {
        const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
        const schedulesUidData = (await schedulesUidRef.get()).data()

        if (schedulesUidData === undefined) return true

        if (schedulesUidData.schedules.includes(scheduleUid)) return false

        return true

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifySchedulesUid", message)
    }
}
import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const sendScheduleUidToDB = async (scheduleMonth, scheduleUid, setSomethingWrong) => {
    try {

        const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
        const schedulesUidData = (await schedulesUidRef.get()).data()

        if (schedulesUidData === undefined) {
            schedulesUidRef.set({ schedules: [scheduleUid] })

            return
        }

        const currentSchedules = schedulesUidData.schedules
        const schedulesUiUpdated = [...currentSchedules, scheduleUid]

        schedulesUidRef.set({ schedules: [...schedulesUiUpdated] })
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("sendScheduleUidToDB", message)
    }
}
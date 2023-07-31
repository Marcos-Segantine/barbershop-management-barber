import firestore from '@react-native-firebase/firestore';

export const sendScheduleUidToDB = async (scheduleMonth, scheduleUid) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    if (schedulesUidData === undefined) {
        schedulesUidRef.set({ schedules: [scheduleUid] })

        return
    }

    const currentSchedules = schedulesUidData.schedules
    const schedulesUiUpdated = [...currentSchedules, scheduleUid]

    schedulesUidRef.set({ schedules: [...schedulesUiUpdated] })
}
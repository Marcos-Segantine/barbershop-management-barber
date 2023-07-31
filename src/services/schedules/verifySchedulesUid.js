import firestore from '@react-native-firebase/firestore';

export const verifySchedulesUid = async (scheduleMonth, scheduleUid) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    if (schedulesUidData === undefined) return true

    if (schedulesUidData.schedules.includes(scheduleUid)) return false

    return true
}
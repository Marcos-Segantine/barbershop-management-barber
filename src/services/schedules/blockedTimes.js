import firestore from '@react-native-firebase/firestore';

export const blockedTimes = async (professionalUid, data) => {

    if (data) {
        const blockedTimesRef = firestore().collection("blocked_times").doc(professionalUid)
        await blockedTimesRef.set(data)

        return
    }
    else {
        const blockedTimesRef = firestore().collection("blocked_times").doc(professionalUid)
        const blockedTimesData = (await blockedTimesRef.get()).data()

        return blockedTimesData || {}
    }
}
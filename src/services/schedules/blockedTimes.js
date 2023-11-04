import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const blockedTimes = async (professionalUid, data, setSomethingWrong) => {
    try {

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
    } catch ({message}) {
        setSomethingWrong(true)
        handleError("blockedTimes", message)
    }
}
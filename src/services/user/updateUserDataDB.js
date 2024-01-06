import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const updateUserDataDB = async (userData, setSomethingWrong) => {
    try {
        const userRef = firestore().collection("barbers").doc(userData.uid)
        userRef.update({ ...userData })

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateUserDataDB", message)
    }
}
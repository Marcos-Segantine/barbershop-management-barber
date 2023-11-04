import firestore from '@react-native-firebase/firestore';
import { handleError } from '../handlers/handleError';

export const verifyIfDataAlreadyExist = async (field, fieldData, setSomethingWrong) => {
    try {

        if (field === "phone") {
            fieldData = fieldData.replace(/[^0-9]/g, '')
        }

        const usersRef = firestore().collection("users").where(field, "==", fieldData);
        const barbersRef = firestore().collection("barbers").where(field, "==", fieldData);

        const usersData = (await usersRef.get()).docs
        const barbersData = (await barbersRef.get()).docs

        if (usersData.length !== 0) return true;
        if (barbersData.length !== 0) return true;

        return false;
    } catch ({message}) {
        setSomethingWrong(true)
        handleError("verifyIfDataAlreadyExist", message)
    }
}

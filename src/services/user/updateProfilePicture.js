import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { handleError } from '../../handlers/handleError';

export const updateProfilePicture = async (uid, setUserData, setSomethingWrong) => {
    try {
        const barbersRef = firestore().collection('barbers').doc(uid)
        const barberData = (await barbersRef.get()).data();

        const url = await storage().ref("barbers/profilePictures/" + uid).getDownloadURL();

        const barberDataTemp = { ...barberData, profilePicture: url }

        setUserData(barberDataTemp);
        barbersRef.update(barberDataTemp)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateProfilePicture", message)
    }
}
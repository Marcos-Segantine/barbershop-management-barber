import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const userPhoneNumberValidated = (userUid, phone, setSomethingWrong) => {
    try {
        const usersRef = firestore().collection("users").doc(userUid);

        usersRef.update({
            phoneNumberValidated: true,
            phone: phone
        })

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("userPhoneNumberValidated", message)
    }
}
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { handleError } from '../../handlers/handleError';

export const updateUserPassword = async (
    userData,
    setUserData,
    newPassword,
    setSomethingWrong
) => {
    try {

        const barbersRef = firestore().collection('barbers').doc(userData.uid);

        barbersRef.update({
            password: newPassword
        })

        await auth().currentUser.updatePassword(newPassword)
        setUserData({ ...userData, password: newPassword })

    } catch ({ message }) {
        if (error.code === 'auth/requires-recent-login') {
            auth()
                .signInWithEmailAndPassword(userData.email, userData.password)
                .then((res) => {
                    res.user.updatePassword(newPassword)
                })

            return
        }

        setSomethingWrong(true)
        handleError("updateUserPassword", message)
    }
}

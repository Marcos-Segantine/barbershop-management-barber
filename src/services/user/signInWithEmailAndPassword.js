import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleError } from '../../handlers/handleError';

export const signInWithEmailAndPassword = async (email, password, navigation, setSomethingWrong) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)

        await AsyncStorage.setItem('@barberApp__adm__email', email);
        navigation.navigate("SchedulesClients")

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("signInWithEmailAndPassword", message)
    }
}
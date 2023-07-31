import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithEmailAndPassword = async (email, password, navigation, setSomethingWrong) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)

        await AsyncStorage.setItem('@barberApp__adm__email', email);
        navigation.navigate("SchedulesClients")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}
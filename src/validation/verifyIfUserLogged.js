import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleError } from '../handlers/handleError';

export const verifyIfUserLogged = async (navigation, setSomethingWrong) => {
    try {

        const accessAutomatically = await AsyncStorage.getItem("@barber_app__access_automatically")

        if (await AsyncStorage.getItem("@barber_app__barber_email") && (accessAutomatically === 'true' || accessAutomatically === null)) {
            if (accessAutomatically === null) {
                AsyncStorage.setItem("@barber_app__access_automatically", "true")
            }

            setTimeout(() => {
                navigation.navigate("Home")
            }, 500)
        }
        else {
            setTimeout(() => {
                navigation.navigate("Login", { emailProfessionalCreated: null, passwordProfessionalCreated: null })
            }, 500)
        }
    } catch ({ message }) {
        handleError("verifyIfUserLogged", message);
        setSomethingWrong(true)
    }
}

import AsyncStorage from '@react-native-async-storage/async-storage';

export const verifyIfUserLogged = async (navigation, setSomethingWrong) => {
    try {

        if (await AsyncStorage.getItem("@barber_app__barber_email")) {
            setTimeout(() => {
                navigation.navigate("Home")
            }, 100)
        }
        else {
            setTimeout(() => {
                navigation.navigate("Login", { emailProfessionalCreated: null, passwordProfessionalCreated: null })
            }, 2500)
        }
    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}
import AsyncStorage from '@react-native-async-storage/async-storage';

export const verifyIfUserLogged = async (navigation, setSomethingWrong) => {
    try {

        const accessAutomatically = await AsyncStorage.getItem("@barber_app__access_automatically")

        if (await AsyncStorage.getItem("@barber_app__barber_email") && (accessAutomatically === 'true' || accessAutomatically === null)) {
            if (accessAutomatically === null) {
                AsyncStorage.setItem("@barber_app__access_automatically", "true")
            }

            setTimeout(() => {
                navigation.navigate("Home")
            }, 1000)
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

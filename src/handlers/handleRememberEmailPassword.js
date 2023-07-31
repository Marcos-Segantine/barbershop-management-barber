import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleRememberEmailPassword = async (userEmail, isToRememberEmailAndPassword) => {
    if (isToRememberEmailAndPassword) {
        await AsyncStorage.removeItem("@barber_app__email")
        
    } else await AsyncStorage.setItem("@barber_app__email", userEmail)

    return !!!isToRememberEmailAndPassword
}
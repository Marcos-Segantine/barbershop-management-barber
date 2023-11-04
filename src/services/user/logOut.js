import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

export const logOut = async (navigation, setSomethingWrong) => {
    try {
        const keys = ['@barber_app__barber_email', '@barber_app__barber_password'];
        await AsyncStorage.multiRemove(keys);

        navigation.navigate('Login', { emailProfessionalCreated: null, passwordProfessionalCreated: null });

        await auth().signOut();

    } catch ({ message }) {
        console.error('Error logging out:', error);
        setSomethingWrong(true)
    }
}

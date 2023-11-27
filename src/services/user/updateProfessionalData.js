import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { trimAndNormalizeSpaces } from '../../utils/trimAndNormalizeSpaces';
import { capitalizeName } from '../../utils/capitalizaName';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleError } from '../../handlers/handleError';

export const updateProfessionalData = async (
    professionalUid,
    professionalData,
    userData,
    setUserData,
    setIsLoading,
    navigation,
    setSomethingWrong
) => {
    try {

        const barbersRef = firestore().collection('barbers').doc(professionalUid)

        let url = null

        if (professionalData.profilePicture) {
            const reference = storage().ref("barbers/profilePictures/" + professionalUid)
            await reference.putString(professionalData.profilePicture, 'base64')
            url = await storage().ref("barbers/profilePictures/" + professionalUid).getDownloadURL();

            await AsyncStorage.setItem("@barber_app_barber__profilePicture", professionalData.profilePicture)
        }

        const name = capitalizeName(trimAndNormalizeSpaces(professionalData.name || userData.name), setSomethingWrong)
        const email = trimAndNormalizeSpaces(professionalData.email || userData.email)
        const phone = trimAndNormalizeSpaces(professionalData.phone || userData.phone)

        const dataUpdated = {
            name: name,
            email: email,
            phone: phone,
            profilePicture: url || userData.profilePicture,
            gender: professionalData.gender || userData.gender,
            uid: professionalUid,
            phoneNumberValidated: userData.phoneNumberValidated || false
        }

        setUserData({ ...dataUpdated })
        await barbersRef.update({ ...dataUpdated })

        setIsLoading(false)
        navigation.navigate("Profile")

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateProfessionalData", message)
    }
}

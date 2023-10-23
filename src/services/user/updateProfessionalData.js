import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { trimAndNormalizeSpaces } from '../../utils/trimAndNormalizeSpaces';
import { capitalizeName } from '../../utils/capitalizaName';

export const updateProfessionalData = async (
    professionalUid,
    professionalData,
    userData,
    setUserData,
    setIsLoading,
    navigation
) => {
    try {

        const barbersRef = firestore().collection('barbers').doc(professionalUid)

        let url = null

        if (professionalData.profilePicture) {
            const reference = storage().ref("barbers/profilePictures/" + professionalUid)
            await reference.putString(professionalData.profilePicture, 'base64')
            url = await storage().ref("barbers/profilePictures/" + professionalUid).getDownloadURL();
        }

        const name = capitalizeName(trimAndNormalizeSpaces(professionalData.name || userData.name))
        const email = trimAndNormalizeSpaces(professionalData.email || userData.email)
        const phone = trimAndNormalizeSpaces(professionalData.phone || userData.phone)

        const phoneChanged = !!professionalData.phone

        const dataUpdated = {
            name: name,
            email: email,
            phone: phone,
            profilePicture: url || userData.profilePicture,
            gender: professionalData.gender || userData.gender,
            uid: professionalUid,
            phoneNumberValidated: phoneChanged ? false : userData.phoneNumberValidated
        }

        setUserData({ ...dataUpdated })
        await barbersRef.update({ ...dataUpdated })

        if (phoneChanged) {
            navigation.navigate("GetCode")
            return
        }

        setIsLoading(false)
        navigation.navigate("Profile")

    } catch (error) {
        console.error(error, "ERROR HERE");
    }
}

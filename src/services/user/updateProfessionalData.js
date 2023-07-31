import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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

        const dataUpdated = {
            name: professionalData.name || userData.name,
            email: professionalData.email || userData.email,
            nickname: professionalData.nickname || userData.nickname,
            phone: professionalData.phone || userData.phone,
            profilePicture: url || userData.profilePicture,
            gender: professionalData.gender || userData.gender,
            uid: professionalUid
        }

        setUserData({ ...dataUpdated })
        await barbersRef.update({ ...dataUpdated })

        setIsLoading(false)
        navigation.navigate("Profile")

    } catch (error) {
        console.error(error);
    }
}

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const updateProfilePicture = async(uid, setUserData) => {
    const barbersRef = firestore().collection('barbers').doc(uid)
    const barberData = (await barbersRef.get()).data();

    const url = await storage().ref("barbers/profilePictures/" + uid).getDownloadURL();

    const barberDataTemp = { ...barberData, profilePicture: url }

    setUserData(barberDataTemp);
    barbersRef.update(barberDataTemp)
}
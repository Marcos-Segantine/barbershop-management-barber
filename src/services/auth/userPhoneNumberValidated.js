import firestore from '@react-native-firebase/firestore';

export const userPhoneNumberValidated = (userUid, phone) => {
    const usersRef = firestore().collection("users").doc(userUid);

    usersRef.update({
        phoneNumberValidated: true,
        phone: phone
    })
}
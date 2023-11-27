import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const getAllProfessionals = async (setSomethingWrong) => {
    try {

        const barbersRef = firestore().collection("barbers")
        const barbersData = (await barbersRef.get())._docs

        const barbers = barbersData.map(barber => (
            {
                name: barber._data.name,
                profilePicture: barber._data.profilePicture,
                professionalUid: barber._data.uid,
                professionalGender: barber._data.gender
            }
        ))

        return barbers

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllProfessionals", message)
    }
}
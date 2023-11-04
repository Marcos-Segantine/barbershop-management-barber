import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const updateProfessionalServices = async (professionalUid, newServices, setSomethingWrong) => {
    try {

        newServices.forEach(service => {
            service.price = service.price.toString().replace(/[^0-9.,]/g, '').replace(",", ".")
            service.price = Number(service.price)
        });

        const servicesRef = firestore().collection("services").doc(professionalUid)
        const servicesOfProfessional = (await servicesRef.get()).data()

        servicesOfProfessional.services = newServices

        await servicesRef.update({
            ...servicesOfProfessional
        })

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateProfessionalServices", message)
    }
}
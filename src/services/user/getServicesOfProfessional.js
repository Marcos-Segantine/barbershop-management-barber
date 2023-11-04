import firestore from '@react-native-firebase/firestore';

export const getServicesOfProfessional = async (setServices, professionalUid, setSomethingWrong) => {
    try {

        const servicesRef = firestore().collection("services").doc(professionalUid)
        const servicesData = (await servicesRef.get()).data()

        const professionalServices = servicesData.services
        const data = []

        for (const serviceIndex in professionalServices) {
            data.push({
                name: professionalServices[serviceIndex].name,
                price: professionalServices[serviceIndex].price,
            })
        }

        setServices(data)

    } catch ({ message }) {
        console.log(error);
        setSomethingWrong(true)
    }
}
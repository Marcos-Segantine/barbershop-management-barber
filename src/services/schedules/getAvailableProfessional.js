import firestore from '@react-native-firebase/firestore';

import { getDay, getHour, getMonth, getYear } from '../../utils/dateHelper';

export const getAvailableProfessional = async (
    schedule,
    setAvailableProfessional,
    setIsLoading
) => {
    try {
        setIsLoading(true)

        const month = getMonth(schedule)
        const year = getYear(schedule)
        const day = getDay(schedule)
        const hour = getHour(schedule)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const barbersRef = firestore().collection("barbers")

        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()
        const barbersData = await (await barbersRef.get())._docs.map(docBarber => ({
            name: docBarber._data.name,
            professionalUid: docBarber._data.uid,
            profilePicture: docBarber._data.profilePicture
        }))

        if (!unavailableTimesData) {
            setAvailableProfessional(barbersData)
            return
        }
        else if (!!!(unavailableTimesData[day])) {
            setAvailableProfessional(barbersData)
            return
        }

        const dataTemp = []
        const professionals = barbersData.map(barber => ({
            name: barber.name,
            professionalUid: barber.professionalUid,
            profilePicture: barber.profilePicture
        }))

        for (const barber of professionals) {
            if (!!!unavailableTimesData[day][barber]) {
                dataTemp.push(barber)
                continue
            }

            if (!unavailableTimesData[day][barber].includes(hour)) {
                dataTemp.push(barber)
                continue
            }
        }

        setAvailableProfessional(dataTemp);

    } catch (error) {
        console.error(error);
    }
}
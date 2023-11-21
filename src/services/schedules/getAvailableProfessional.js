import firestore from '@react-native-firebase/firestore';

import { getDay, getHour, getMonth, getYear } from '../../utils/dateHelper';
import { getWeekdayType } from '../../utils/getWeekdayType';

import { handleError } from '../../handlers/handleError';

export const getAvailableProfessional = async (
    schedule,
    setAvailableProfessional,
    setIsLoading,
    setSomethingWrong
) => {
    try {
        setIsLoading(true)

        const month = getMonth(schedule, setSomethingWrong)
        const year = getYear(schedule, setSomethingWrong)
        const day = getDay(schedule, setSomethingWrong)
        const hour = getHour(schedule, setSomethingWrong)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const barbersRef = firestore().collection("barbers")

        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()
        const barbersData = await (await barbersRef.get())._docs.map(docBarber => ({
            name: docBarber._data.name,
            professionalUid: docBarber._data.uid,
            profilePicture: docBarber._data.profilePicture,
            professionalGender: docBarber._data.gender
        }))

        const dataTemp = []
        const professionals = barbersData.map(barber => ({
            name: barber.name,
            professionalUid: barber.professionalUid,
            profilePicture: barber.profilePicture
        }))

        for (const barber of professionals) {
            const workingHoursRef = firestore().collection("working_hours").doc(barber.professionalUid)
            const workingHoursData = (await workingHoursRef.get()).data()

            const weekType = getWeekdayType(new Date(schedule.day).getDay() + 1)

            if (workingHoursData[weekType].includes(hour) == false) {
                continue;
            }
            else if (!unavailableTimesData) {
                dataTemp.push(barber)
                continue
            }
            else if (unavailableTimesData[day] === undefined) {
                dataTemp.push(barber)
                continue
            }
            else if (unavailableTimesData[day][barber.professionalUid] === undefined) {
                dataTemp.push(barber)
                continue
            }
            else if (unavailableTimesData[day][barber.professionalUid].includes(hour) === false) {
                dataTemp.push(barber)
                continue
            }
        }

        setAvailableProfessional(dataTemp);

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAvailableProfessional", message)
    }
}

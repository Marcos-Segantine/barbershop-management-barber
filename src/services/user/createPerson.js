import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { generateNewUid } from '../../utils/generateNewUid';
import { trimAndNormalizeSpaces } from '../../utils/trimAndNormalizeSpaces';
import { capitalizeName } from '../../utils/capitalizaName';

export const createPerson = async (newPerson, setSchedule, schedule) => {
    try {

        const uid = newPerson.uid ? newPerson.uid : generateNewUid()

        const batch = firestore().batch();

        const reference = storage().ref(`${newPerson.newPerson === "client" ? "clients" : "barbers"}/profilePictures/` + uid)

        if (newPerson.profilePicture) {
            await reference.putString(newPerson.profilePicture, 'base64');
        }

        if (newPerson.newPerson === "client") {
            const usersRef = firestore().collection('users').doc(uid);
            const schedulesByUserRef = firestore().collection("schedules_by_user").doc(uid)

            batch.set(usersRef, {
                name: capitalizeName(trimAndNormalizeSpaces(newPerson.name)),
                email: trimAndNormalizeSpaces(newPerson.email),
                password: newPerson.password,
                phone: trimAndNormalizeSpaces(newPerson.phone),
                gender: newPerson.gender,
                profilePicture: newPerson.profilePicture && await reference.getDownloadURL(),
                uid: uid,
            })

            batch.set(schedulesByUserRef, {
                schedules: [],
            })

            setSchedule({ ...schedule, client: { ...newPerson, uid: uid } })

            await batch.commit()

            return
        }

        const barbersRef = firestore().collection("barbers").doc(uid);
        const workingHoursRef = firestore().collection("working_hours").doc(uid);
        const servicesRef = firestore().collection("services").doc(uid)
        const workingHoursDefaultRef = firestore().collection("working_hours").doc("default")

        const workingHoursDefaultData = (await workingHoursDefaultRef.get()).data()

        const allSchedulesOfProfessional = [...newPerson.workHour.saturday, ...newPerson.workHour.sunday, ...newPerson.workHour.weekday]
        if (workingHoursDefaultData === undefined) {
            batch.set(workingHoursDefaultRef, {
                times: allSchedulesOfProfessional
            })
        }
        else {
            const workingHoursDefaultUpdated = workingHoursDefaultData.times

            for (const schedule of workingHoursDefaultUpdated) {
                if (allSchedulesOfProfessional.includes(schedule)) continue
                else allSchedulesOfProfessional.push(schedule)
            }

            batch.set(workingHoursDefaultRef, {
                times: allSchedulesOfProfessional
            })
        }

        batch.set(servicesRef, {
            "services": [...newPerson.services]
        })

        batch.set(workingHoursRef, {
            saturday: newPerson.workHour.saturday,
            sunday: newPerson.workHour.sunday,
            weekday: newPerson.workHour.weekday,
        })

        batch.set(barbersRef, {
            name: newPerson.name,
            phone: newPerson.phone,
            email: newPerson.email,
            password: newPerson.password,
            gender: newPerson.gender,
            profilePicture: newPerson.profilePicture && await reference.getDownloadURL(),
            uid: uid,
        })

        await batch.commit();

    } catch (error) {
        console.error(error);
    }
}

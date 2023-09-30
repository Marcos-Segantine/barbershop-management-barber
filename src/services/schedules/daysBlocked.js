import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../../assets/globalStyles';

export const daysBlocked = async (professionalUid, isToEditDays = false, days = null) => {

    const daysBlockedRef = firestore().collection("days_blocked").doc(professionalUid)
    const daysBlockedData = (await daysBlockedRef.get()).data()

    if (days === null) {
        if (daysBlockedData && isToEditDays) {
            for (const day in daysBlockedData) {
                daysBlockedData[day] = {
                    selected: true,
                    marked: true,
                    selectedColor: globalStyles.orangeColor,
                }
            }

            return daysBlockedData
        }
        else if (daysBlockedData) return daysBlockedData

        return {}
    }

    for (const day in days) {
        days[day] = {
            disableTouchEvent: true,
            disabled: true
        }
    }

    await daysBlockedRef.set({
        ...days
    })
}
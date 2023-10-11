import firestore from '@react-native-firebase/firestore';

export const handleError = async (functionWithError, errorMessage) => {

    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()
    const currentDate = date.getDate()
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes()

    const errorRef = firestore().collection("errors-from-barber-app").doc(`${currentMonth}_${currentYear}`)

    try {

        await errorRef.update({
            [functionWithError]: {
                date: `${currentYear}/${currentMonth}/${currentDate}`,
                errorMessage: errorMessage,
                hour: `${currentHour}:${currentMinute}`,
            }
        })

    } catch ({ message }) {
        errorRef.set({
            [functionWithError]: {
                date: `${currentYear}/${currentMonth}/${currentDate}`,
                errorMessage: errorMessage,
                hour: `${currentHour}:${currentMinute}`,
            }
        })
    }
}

import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleError } from './handleError';

export const handleAlertConcludeSchedule = async (value, setter, setSomethingWrong) => {
    try {
        setter(value)

        if (value) await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "true")
        else await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "false")

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleAlertConcludeSchedule", message)
    }
}

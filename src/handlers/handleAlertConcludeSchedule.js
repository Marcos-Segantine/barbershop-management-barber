import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAlertConcludeSchedule = async (value, setter) => {
    setter(value)

    if (value) await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "true")
    else await AsyncStorage.setItem("@barber_app__alert_conclude_schedule", "false")
}
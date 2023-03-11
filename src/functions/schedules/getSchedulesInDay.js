import firestore from '@react-native-firebase/firestore';

export const getSchedulesInDay = async (dateFormated, daySchedule, weekday, setData, day) => {
  const workingHoursRef = await firestore().collection("working_hours").get()
  const workingHoursData = workingHoursRef._docs[weekday]._data.times

  const unavailableTimesRef = firestore().collection("unavailable_times").doc(dateFormated)
  const unavailableTimesData = (await unavailableTimesRef.get()).data()[daySchedule]["Barbeiro 1"]

  const dataTemp = workingHoursData.map(workingHour => {
    if (unavailableTimesData.includes(workingHour)) {
      return {
        day: day,
        isScheduleFree: false,
        hour: workingHour
      }
    } else {
      return {
        day: day,
        isScheduleFree: true,
        hour: workingHour
      }
    }
  })

  setData(dataTemp)
}
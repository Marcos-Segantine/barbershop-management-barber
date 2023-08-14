import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';
import { getCurrentHour } from '../../utils/getCurrentHour';

export const getSchedulesInDay = async (
  dateFormatted,
  scheduleDay,
  weekday,
  barberInfo,
  setData,
  setSomethingWrong
) => {
  try {

    const day = getDay(scheduleDay)
    const month = getMonth(scheduleDay)
    const year = getYear(scheduleDay)

    const schedulesMonthRef = firestore().collection("schedules_month").doc(dateFormatted)
    const workingHoursRef = firestore().collection("working_hours").doc(barberInfo.uid)

    const schedulesMonthData = (await schedulesMonthRef.get()).data()[day][barberInfo.uid]
    const workingHoursData = (await workingHoursRef.get()).data()[weekday]

    const data = []

    const schedulesOfProfessional = Object.keys(schedulesMonthData)

    const currentHour = getCurrentHour()
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentDate = Number(currentDay) === Number(day) && Number(currentMonth) === Number(month)

    workingHoursData.forEach(workTime => {
      const workTimeToCompare = Number(workTime.split(":")[0])

      if (workTimeToCompare < currentHour && currentDate) return

      if (schedulesOfProfessional.includes(workTime)) {
        data.push({
          day: day,
          isScheduleFree: false,
          hour: workTime,
          clientName: schedulesMonthData[workTime].name,
          date: schedulesMonthData[workTime].day
        })
      } else {
        data.push({
          day: day,
          isScheduleFree: true,
          hour: workTime,
          clientName: null,
          date: year + "-" + month + "-" + day
        })
      }
    });

    setData(data)

  } catch (error) {
    console.error(error);
    setSomethingWrong(true)
  }
}

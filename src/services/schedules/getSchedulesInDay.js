import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';
import { getCurrentHour } from '../../utils/getCurrentHour';
import { sortByHour } from '../../utils/sortByHour';

import { handleError } from '../../handlers/handleError';

export const getSchedulesInDay = async (
  dateFormatted,
  scheduleDay,
  weekday,
  barberInfo,
  setData,
  isToFilterByHour,
  setSomethingWrong
) => {
  try {

    const day = getDay(scheduleDay, setSomethingWrong)
    const month = getMonth(scheduleDay, setSomethingWrong)
    const year = getYear(scheduleDay, setSomethingWrong)

    const schedulesMonthRef = firestore().collection("schedules_month").doc(dateFormatted)
    const workingHoursRef = firestore().collection("working_hours").doc(barberInfo.uid)

    const schedulesMonthData = (await schedulesMonthRef.get()).data()[day][barberInfo.uid]
    const workingHoursData = (await workingHoursRef.get()).data()[weekday]

    const data = []

    const schedulesOfProfessional = Object.keys(schedulesMonthData)

    const currentHour = getCurrentHour(setSomethingWrong)
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentDate = Number(currentDay) === Number(day) && Number(currentMonth) === Number(month)

    workingHoursData.forEach(workTime => {
      const workTimeToCompare = Number(workTime.split(":")[0])

      if (workTimeToCompare < currentHour && currentDate && isToFilterByHour) return

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

    setData(sortByHour(data, setSomethingWrong))

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getSchedulesInDay", message)
  }
}

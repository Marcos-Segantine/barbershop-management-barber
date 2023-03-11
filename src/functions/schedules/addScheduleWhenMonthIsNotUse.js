import firestore from '@react-native-firebase/firestore';

import { getDay, getYear, getMonth, getProfessional, getHour } from '../helpers/getDate';

import { setDataToUpdateSchedulesMonth } from './addScheduleWhenMonthIsNotUse/setDataToUpdateSchedulesMonth';
import { setDataToUpdateSchedulesByUser } from './addScheduleWhenMonthIsNotUse/setDataToUpdateSchedulesByUser';

export const addScheduleWhenMonthIsNotUse = (
  uidClient,
  navigation,
  schedule,
) => {
  console.log('addScheduleWhenMonthIsNotUse CALLED');

  const scheduleYear = getYear(schedule)
  const scheduleMonth = getMonth(schedule);
  const scheduleHour = getHour(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleProfessional = getProfessional(schedule);

  const batch = firestore().batch();

  const docNameMonthYear = `${scheduleMonth}_${scheduleYear}`

  try {

    // getting collections reference
    const schedulesMonthRef = firestore().collection('schedules_month').doc(docNameMonthYear);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(docNameMonthYear);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(uidClient);

    // defing data to update collections
    const scheduleMonthData = setDataToUpdateSchedulesMonth(scheduleDay, scheduleHour, scheduleProfessional, schedule)
    const unavailableTimesData = {
      [scheduleDay]: {
        [scheduleProfessional]: [schedule.shedule],
      },
    };
    const dataToUpdateSchedulesByUser = setDataToUpdateSchedulesByUser()

    batch.set(schedulesMonthRef, scheduleMonthData);
    batch.set(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesByUserRef, dataToUpdateSchedulesByUser);

    batch.commit()
    navigation.navigate('FinalScreen');

  } catch (error) {
    console.log(error);
  }
};

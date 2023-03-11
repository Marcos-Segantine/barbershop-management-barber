import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getDay, getYear, getMonth } from '../helpers/getDate'

import { verifySchedules } from './verifySchedules';

import { setDataToUpdateSchedulesMonth } from './addScheduleWhenDayNotUse/setDataToUpdateSchedulesMonth';
import { setDataToUpdateSchedulesByUser } from './addScheduleWhenDayNotUse/setDataToUpdateSchedulesByUser';

export const addScheduleWhenDayNotUse = async (
  userData,
  navigation,
  schedule,
) => {
  console.log('addScheduleWhenDayNotUse CALLED');

  const scheduleMonth = getMonth(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleHour = getHour(schedule);
  const scheduleYear = getYear(schedule)

  const scheduleProfessional = auth().currentUser

  const docNameMonthYear = `${scheduleMonth}_${scheduleYear}`

  try {

    // getting collections reference 
    const schedulesMonthRef = firestore().collection('schedules_month').doc(docNameMonthYear);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(docNameMonthYear);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userData.uid);

    const batch = firestore().batch()

    // getting data from collections
    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    const schedulesByUserData = (await schedulesByUserRef.get()).data()

    const dataToUpdateSchedulesMonth = setDataToUpdateSchedulesMonth(schedulesMonthData, scheduleDay, scheduleProfessional, scheduleHour, schedule)
    const dataToUpdateSchedulesByUser = setDataToUpdateSchedulesByUser(schedulesByUserData, schedule, scheduleProfessional)

    const unavailableTimesDoc = await unavailableTimesRef.get();
    let unavailableTimesData = unavailableTimesDoc.data() || {};

    if (!unavailableTimesData[scheduleDay]) {
      unavailableTimesData = {
        ...unavailableTimesData,
        [scheduleDay]: {
          [scheduleProfessional]: [`${schedule.shedule}`],
        },
      };
    } else {
      unavailableTimesData[scheduleDay][scheduleProfessional]
        ? unavailableTimesData[scheduleDay][scheduleProfessional].push(
          `${schedule.shedule}`,
        )
        : (unavailableTimesData[scheduleDay] = {
          ...unavailableTimesData[scheduleDay],
          [scheduleProfessional]: [`${schedule.shedule}`],
        });
    }

    await unavailableTimesRef.set(unavailableTimesData);

    verifySchedules(schedule);

    batch.update(schedulesByUserRef, dataToUpdateSchedulesByUser);
    batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);

    await batch.commit()

    navigation.navigate('FinalScreen');

  } catch (error) {
    console.error('Error adding schedule:', error);
  }
};

import firestore from '@react-native-firebase/firestore';

import { getDay, getYear, getMonth, getHour } from '../helpers/getDate'

import { verifySchedules } from './verifySchedules';

import { setDataToUpdateSchedulesMonth } from './addScheduleWhenDayAlredyUse/setDataToUpdateSchedulesMonth';
import { setDataToUpdateSchedulesByUser } from './addScheduleWhenDayAlredyUse/setDataToUpdateSchedulesByUser';

export const addScheduleWhenDayAlredyUse = async (
  navigation,
  client,
  schedule,
  professionalName,
) => {

  console.log('addScheduleWhenDayAlredyUse CALLED');

  const scheduleYear = getYear(schedule)
  const scheduleMonth = getMonth(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleHour = getHour(schedule);

  const docNameMonthYear = `${scheduleMonth}_${scheduleYear}`

  // getting collection's reference
  const schedulesMonthRef = firestore().collection('schedules_month').doc(docNameMonthYear);
  const unavailableTimesRef = firestore().collection('unavailable_times').doc(docNameMonthYear);
  const schedulesByUserRef = firestore().collection('schedules_by_user').doc(client.uid);

  const batch = firestore().batch();

  // getting data from collection
  const schedulesMonthData = (await schedulesMonthRef.get()).data();

  try {
    const atualSchedulesProfessional = schedulesMonthData[scheduleDay][professionalName];

    // if professional alredy have a schedule marked in day this will just increment a new schedule
    if (atualSchedulesProfessional) {
      const dataToUpdateSchedulesMonth =
        setDataToUpdateSchedulesMonth(
          schedulesMonthData,
          scheduleDay,
          professionalName,
          atualSchedulesProfessional,
          scheduleHour,
          schedule,
          client
        )

      batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
      batch.update(unavailableTimesRef, {
        [`${scheduleDay}.${professionalName}`]:
          firestore.FieldValue.arrayUnion(schedule.shedule),
      });

      // if the current professional don't have a schedule marked in the day selected, this will set a new field in this day at database
    } else {

      const dataToUpdateSchedulesMonth = {
        [`${scheduleDay}.${professionalName}`]: {
          [scheduleHour]: schedule,
        },
      }

      batch.set(
        schedulesMonthRef,
        dataToUpdateSchedulesMonth,
        { merge: true },
      );

      batch.set(
        unavailableTimesRef,
        {
          [`${scheduleDay}.${professionalName}`]: [schedule.shedule],
        },
        { merge: true },
      );
    }

    verifySchedules(schedule, 'addSchedule', professionalName);

    const dataToUpdateSchedulesByUser = setDataToUpdateSchedulesByUser(schedule, client, professionalName)
    batch.update(schedulesByUserRef, {
      schedules: firestore.FieldValue.arrayUnion(dataToUpdateSchedulesByUser)
    });

    await batch.commit();

    navigation.navigate('SchedulesClients');

  } catch (error) {
    console.log(error);
  }
};
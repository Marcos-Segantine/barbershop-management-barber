import firestore from '@react-native-firebase/firestore';

import {getDay} from '../helpers/getDay';
import {getMonth} from '../helpers/getMonth';
import {getProfessional} from '../helpers/getProfessional';
import {getHour} from '../helpers/getHours';

export const addScheduleWhenMonthIsNotUse = (
  uidClient,
  navigation,
  schedule,
) => {
  console.log('addScheduleWhenMonthIsNotUse CALLED');

  const scheduleMonth = getMonth(schedule);
  const scheduleHour = getHour(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleProfessional = getProfessional(schedule);

  const batch = firestore().batch();

  // Add schedule to schedules_month collection
  const schedulesMonthRef = firestore()
    .collection('schedules_month')
    .doc(`${scheduleMonth}_2023`);
  const scheduleMonthData = {
    [scheduleDay]: {
      [scheduleProfessional]: {
        [scheduleHour]: {
          day: schedule.day,
          email: schedule.client.email,
          name: schedule.client.name,
          password: schedule.client.password,
          phone: schedule.client.phone,
          professional: scheduleProfessional,
          scheduleUid: schedule.scheduleUid,
          shedule: schedule.shedule,
          uid: schedule.client.uid,
        },
      },
    },
  };
  batch.set(schedulesMonthRef, scheduleMonthData);

  // Add schedule to unavailable_times collection
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${scheduleMonth}_2023`);
  const unavailableTimesData = {
    [scheduleDay]: {
      [scheduleProfessional]: [schedule.shedule],
    },
  };
  batch.set(unavailableTimesRef, unavailableTimesData);

  // Add schedule to schedules_by_user collection
  const schedulesByUserRef = firestore()
    .collection('schedules_by_user')
    .doc(uidClient);
  batch.update(schedulesByUserRef, {
    schedules: firestore.FieldValue.arrayUnion({
      day: schedule.day,
      email: schedule.client.email,
      name: schedule.client.name,
      password: schedule.client.password,
      phone: schedule.client.phone,
      professional: scheduleProfessional,
      scheduleUid: schedule.scheduleUid,
      shedule: schedule.shedule,
      uid: schedule.client.uid,
    }),
  });

  batch
    .commit()
    .then(() => {
      console.log('SCHEDULES UPDATED!!');
      navigation.navigate('FinalScreen');
    })
    .catch(error => {
      console.error('Error updating schedules:', error);
    });
};

import firestore from '@react-native-firebase/firestore';

import { getDay } from '../helpers/getDay';
import { getMonth } from '../helpers/getMonth';
import { getHour } from '../helpers/getHours';

import { verifySchedules } from '../helpers/verifySchedules';

export const addScheduleWhenDayAlredyUse = async (
  navigation,
  client,
  schedule,
  professionalName,
) => {
  const scheduleMonth = getMonth(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleHour = getHour(schedule);

  console.log('addScheduleWhenDayAlredyUse CALLED');

  const schedulesMonthRef = firestore()
    .collection('schedules_month')
    .doc(`${scheduleMonth}_2023`);
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${scheduleMonth}_2023`);
  const schedulesByUserRef = firestore()
    .collection('schedules_by_user')
    .doc(client.uid);


  const batch = firestore().batch();

  const schedulesMonthSnapshot = await schedulesMonthRef.get();
  const schedulesMonthData = schedulesMonthSnapshot.data();

  try {
    if (schedulesMonthData[scheduleDay]?.[professionalName]) {
      const existingSchedule =
        schedulesMonthData[scheduleDay][professionalName][scheduleHour];
      if (existingSchedule) {
        throw new Error(
          'There is already a schedule at the same time for this professional.',
        );
      }
      
      const atualSchedulesProfessional =
        schedulesMonthData[scheduleDay][professionalName];
      batch.update(schedulesMonthRef, {
        ...schedulesMonthData,
        [scheduleDay]: {
          [professionalName]: {
            ...atualSchedulesProfessional,
            [scheduleHour]: {
              day: schedule.day,
              email: client.email,
              name: client.name,
              password: client.password,
              phone: client.phone,
              professional: professionalName,
              service: schedule.service,
              scheduleUid: schedule.scheduleUid,
              shedule: schedule.shedule,
              uid: client.uid,
            },
          },
        },
      });
    } else {
      batch.set(
        schedulesMonthRef,
        {
          [`${scheduleDay}.${professionalName}`]: {
            [scheduleHour]: schedule,
          },
        },
        { merge: true },
      );
    }

    const unavailableTimesSnapshot = await unavailableTimesRef.get();
    const unavailableTimesData = unavailableTimesSnapshot.data();

    if (unavailableTimesData[scheduleDay]?.[professionalName]) {
      batch.update(unavailableTimesRef, {
        [`${scheduleDay}.${professionalName}`]:
          firestore.FieldValue.arrayUnion(schedule.shedule),
      });
    } else {
      batch.set(
        unavailableTimesRef,
        {
          [`${scheduleDay}.${professionalName}`]: [schedule.shedule],
        },
        { merge: true },
      );
    }

    verifySchedules(schedule, 'addSchedule', professionalName);

    const schedulesByUserSnapshot = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserSnapshot.data();
    const updatedSchedulesByUser = {
      schedules: [
        ...schedulesByUserData.schedules,
        {
          day: schedule.day,
          email: client.email,
          name: client.name,
          password: client.password,
          phone: client.phone,
          professional: professionalName,
          service: schedule.service,
          scheduleUid: schedule.scheduleUid,
          shedule: schedule.shedule,
          uid: client.uid,
        },
      ],
    };
    batch.update(schedulesByUserRef, updatedSchedulesByUser);

  } catch (error) {
    console.log(error);
  }

  await batch.commit();

  navigation.navigate('SchedulesClients');
};
import firestore from '@react-native-firebase/firestore';

import {getDay} from '../helpers/getDay';
import {getMonth} from '../helpers/getMonth';
import {getHour} from '../helpers/getHours';

import {verifySchedules} from '../helpers/verifySchedules';

export const addScheduleWhenDayAlredyUse = async (
  navigation,
  userData,
  schedule,
  scheduleProfessional,
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
    .doc(userData.uid);

  const batch = firestore().batch();

  const schedulesMonthSnapshot = await schedulesMonthRef.get();
  const schedulesMonthData = schedulesMonthSnapshot.data();

  if (schedulesMonthData[scheduleDay]?.[scheduleProfessional]) {
    const existingSchedule =
      schedulesMonthData[scheduleDay][scheduleProfessional][scheduleHour];
    if (existingSchedule) {
      throw new Error(
        'There is already a schedule at the same time for this professional.',
      );
    }
    const atualSchedulesProfessional =
      schedulesMonthData[scheduleDay][scheduleProfessional];
    batch.update(schedulesMonthRef, {
      ...schedulesMonthData,
      [scheduleDay]: {
        [scheduleProfessional]: {
          ...atualSchedulesProfessional,
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
    });
  } else {
    batch.set(
      schedulesMonthRef,
      {
        [`${scheduleDay}.${scheduleProfessional}`]: {
          [scheduleHour]: schedule,
        },
      },
      {merge: true},
    );
  }

  const unavailableTimesSnapshot = await unavailableTimesRef.get();
  const unavailableTimesData = unavailableTimesSnapshot.data();

  if (unavailableTimesData[scheduleDay]?.[scheduleProfessional]) {
    batch.update(unavailableTimesRef, {
      [`${scheduleDay}.${scheduleProfessional}`]:
        firestore.FieldValue.arrayUnion(schedule.shedule),
    });
  } else {
    batch.set(
      unavailableTimesRef,
      {
        [`${scheduleDay}.${scheduleProfessional}`]: [schedule.shedule],
      },
      {merge: true},
    );
  }

  verifySchedules(schedule, scheduleProfessional);

  const schedulesByUserSnapshot = await schedulesByUserRef.get();
  const schedulesByUserData = schedulesByUserSnapshot.data();
  const updatedSchedulesByUser = {
    schedules: [
      ...schedulesByUserData.schedules,
      {
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
    ],
  };
  batch.update(schedulesByUserRef, updatedSchedulesByUser);

  await batch.commit();

  navigation.navigate('SchedulesClients');
};

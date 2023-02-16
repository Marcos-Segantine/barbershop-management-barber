import firestore from '@react-native-firebase/firestore';

import {getDay} from '../helpers/getDay';
import {getMonth} from '../helpers/getMonth';
import {getProfessional} from '../helpers/getProfessional';
import {getHour} from '../helpers/getHours';

import {verifySchedules} from '../helpers/verifySchedules';

export const addScheduleWhenDayNotUse = async (
  userData,
  navigation,
  schedule,
) => {
  console.log('addScheduleWhenDayNotUse CALLED');

  const scheduleMonth = getMonth(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleHour = getHour(schedule);
  const scheduleProfessional = getProfessional(schedule);

  try {
    const schedulesMonthRef = firestore()
      .collection('schedules_month')
      .doc(`${scheduleMonth}_2023`);
    const schedulesMonthDoc = await schedulesMonthRef.get();
    const schedulesMonthData = schedulesMonthDoc.data();

    await schedulesMonthRef.update({
      ...schedulesMonthData,
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
    });

    const unavailableTimesRef = firestore()
      .collection('unavailable_times')
      .doc(`${scheduleMonth}_2023`);
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

    console.log('unavailable_times updated!!');

    verifySchedules(schedule);

    const schedulesByUserRef = firestore()
      .collection('schedules_by_user')
      .doc(userData.uid);
    const schedulesByUserDoc = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserDoc.data();

    await schedulesByUserRef.update({
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
    });

    console.log('schedules_by_user UPDATED!!');

    navigation.navigate('FinalScreen');
  } catch (error) {
    console.error('Error adding schedule:', error);
  }
};

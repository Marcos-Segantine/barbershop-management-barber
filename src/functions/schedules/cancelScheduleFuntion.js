import { getMonth } from '../helpers/getMonth';
import { getDay } from '../helpers/getDay';
import { getProfessional } from '../helpers/getProfessional';
import { getYear } from '../helpers/getYear';

import { verifySchedules } from '../helpers/verifySchedules';

import firestore from '@react-native-firebase/firestore';

export const cancelScheduleFuntion = async (uidClient, schedule, navigation, professionalName) => {

  const scheduleDay = getDay(schedule);
  const scheduleMouth = getMonth(schedule);
  const scheduleYear = getYear(schedule)

  const referenceDocMonth_Year = `${scheduleMouth}_${scheduleYear}`

  const batch = firestore().batch()

  try {

    // getting collections reference
    const schedulesByUserRef = firestore().collection("schedules_by_user").doc(uidClient)
    const schedulesMonthRef = firestore().collection("schedules_month").doc(referenceDocMonth_Year)
    const unavailableTimesRef = firestore().collection("unavailable_times").doc(referenceDocMonth_Year)

    // getting data from eaxxh collection
    const schedulesByUserData = (await schedulesByUserRef.get()).data()
    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    const unavailableTimesData = (await unavailableTimesRef.get()).data()

    // setting new data to 'schedules_by_user' collection
    const newSchedules__Temp = schedulesByUserData.schedules.filter(scheduleFilter => {
      return scheduleFilter.scheduleUid !== schedule.scheduleUid;
    });
    schedulesByUserData.schedules = newSchedules__Temp;

    // setting new data to 'schedules_month' collection
    delete schedulesMonthData[scheduleDay][professionalName][schedule.shedule];

    // setting new data to 'unavailable_times' collection
    const unavailableTimesIndexToRemove = unavailableTimesData[scheduleDay][professionalName].indexOf(schedule.shedule)
    unavailableTimesData[scheduleDay][professionalName].splice(unavailableTimesIndexToRemove, 1)

    //updating collections
    batch.update(schedulesByUserRef, { ...schedulesByUserData })
    batch.update(schedulesMonthRef, { ...schedulesMonthData })
    batch.update(unavailableTimesRef, { ...unavailableTimesData })

    await batch.commit()

    verifySchedules(schedule, 'removeSchedule', professionalName)
    navigation.navigate('SchedulesClients');
    
  } catch (error) {
    console.log("ERROR");
  }
};

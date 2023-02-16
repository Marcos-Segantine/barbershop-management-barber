import firestore from '@react-native-firebase/firestore';

import {getDay} from '../helpers/getDay';
import {getMonth} from '../helpers/getMonth';
import {getProfessional} from '../helpers/getProfessional';
import {getYear} from './getYear';

const DAYS_OF_WEEK = ['weekday', 'saturday', 'sunday'];

export const verifySchedules = async (schedulesUser, barberName) => {
  const year = getYear(schedulesUser);
  const month = getMonth(schedulesUser);
  const day = getDay(schedulesUser);
  const date = new Date(schedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay = DAYS_OF_WEEK[dayOfSchedule > 5 ? dayOfSchedule - 5 : 0];

  const workingHourDoc = await firestore()
    .collection('working_hours')
    .doc(weekDay)
    .get();
  const workingHour = workingHourDoc.data().times;

  const unavailableTimesDoc = await firestore()
    .collection('unavailable_times')
    .doc(`${month}_${year}`)
    .get();
  const unavailableTimes = unavailableTimesDoc.data();

  const deniedDaysDoc = await firestore()
    .collection('denied_days')
    .doc(`${month}_${year}`)
    .get();
  const deniedDays = deniedDaysDoc.data();

  console.log(unavailableTimes, day);
  if (unavailableTimes[day][barberName].length === workingHour.length) {
    deniedDays[`2023-${month}-${day}`] = {
      disableTouchEvent: true,
      disabled: true,
    };

    await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .update(deniedDays);
  } else if (
    unavailableTimes[day][barberName].length ===
    workingHour.length - 1
  ) {
    delete deniedDays[schedulesUser.day].disableTouchEvent;
    delete deniedDays[schedulesUser.day].disabled;

    await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .update(deniedDays);
  }
};

import firestore from '@react-native-firebase/firestore';

import { getDay } from '../helpers/getDay';
import { getMonth } from '../helpers/getMonth';
import { getYear } from './getYear';

const DAYS_OF_WEEK = ['saturday', 'sunday', 'weekday'];

export const verifySchedules = async (schedulesUser, action, professionalName) => {
  const year = getYear(schedulesUser);
  const month = getMonth(schedulesUser);
  const day = getDay(schedulesUser);
  const date = new Date(schedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay = DAYS_OF_WEEK[dayOfSchedule <= 5 ? 0 : dayOfSchedule - 6];

  const workingHoursRef = firestore().collection('working_hours');
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${month}_${year}`);
  const deniedDaysRef = firestore()
    .collection('denied_days')
    .doc(`${month}_${year}`);

  const deniedDaysData = (await deniedDaysRef.get()).data();

  const workingHourDocs = await workingHoursRef.get();
  const workingHoursData =
    workingHourDocs._docs[DAYS_OF_WEEK.indexOf(weekDay)]._data;

  const unavailableTimesData = (await unavailableTimesRef.get()).data();

  const unavailableTimesByProfessional =
    unavailableTimesData[day][professionalName];

  if (
    unavailableTimesByProfessional.length ===
    workingHoursData.times.length - 1 &&
    action === 'addSchedule'
  ) {
    deniedDaysData[day][professionalName].push({
      [schedulesUser.day]: {
        disabled: true,
        disableTouchEvent: true,
      },
    });
    deniedDaysRef.update(deniedDaysData);
  } else if (action === 'removeSchedule') {
    const dayToRemove = deniedDaysData[day][professionalName].filter(currentDay => {
      return Object.keys(currentDay)[0] === schedulesUser.day;
    });

    const dayToRemoveIndex = deniedDaysData[day][professionalName].indexOf(
      Object.keys(dayToRemove),
    );

    deniedDaysData[day][professionalName].splice(dayToRemoveIndex, 1);

    deniedDaysRef.update(deniedDaysData);
  }
};

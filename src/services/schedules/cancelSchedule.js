import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth } from '../../utils/dateHelper';

export const cancelSchedule = async (clientUid, scheduleInfo, setSomethingWrong) => {

  try {

    const scheduleMonth = getMonth(scheduleInfo, setSomethingWrong);
    const scheduleYear = getYear(scheduleInfo, setSomethingWrong);
    const scheduleDay = getDay(scheduleInfo, setSomethingWrong);
    const professional = scheduleInfo.professionalUid;

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesUidRef = firestore().collection('schedules_uid').doc(nameDocMonth_Year);

    const batch = firestore().batch();

    const schedulesByUserData = (await schedulesByUserRef.get()).data()
    const schedulesByUser = schedulesByUserData.schedules || [];

    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== scheduleInfo.scheduleUid,
    );

    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    delete schedulesMonthData[scheduleDay]?.[professional]?.[scheduleInfo.schedule];


    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const unavailableData = unavailableTimesData;

    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== scheduleInfo.schedule,
      ) || [];


    unavailableData[scheduleDay][professional] = newData;

    const schedulesUidData = (await schedulesUidRef.get()).data().schedules
    const schedulesUidUpdated = schedulesUidData.filter(scheduleUid => scheduleUid !== scheduleInfo.scheduleUid);

    batch.update(schedulesByUserRef, { schedules: newSchedules });
    batch.update(schedulesMonthRef, schedulesMonthData);
    batch.update(unavailableTimesRef, unavailableData);
    batch.update(schedulesUidRef, { schedules: [...schedulesUidUpdated] });

    await batch.commit();

  } catch ({ message }) {
    console.error('Error cancelling schedule: ', error);
    setSomethingWrong(true);
  }
};
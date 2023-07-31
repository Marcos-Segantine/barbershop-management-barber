import firestore from '@react-native-firebase/firestore';

import { isDatePassed } from '../../utils/isDatePassed';

export const fetchDataSchedulesClients = async (
  setDataFiltered,
  barberName,
  setSomethingWrong
) => {

  try {

    const schedulesQuerySnapshot = await firestore().collection('schedules_month').get();

    const dataTemp = [];

    schedulesQuerySnapshot.forEach(doc => {

      const data = doc.data();


      Object.keys(data).forEach(day => {
        const barberSchedule = data[day][barberName];
        if (!barberSchedule) return

        const hasScheduleInCurrentDay = Object.keys(data[day][barberName])
        
        if(!hasScheduleInCurrentDay.length) return
        
        if(isDatePassed(data[day][barberName][Object.keys(data[day][barberName])[0]])) return

        const keys__barberSchedule = Object.keys(barberSchedule)

        if (keys__barberSchedule.length > 0) {
          dataTemp.push(barberSchedule[Object.keys(barberSchedule)[0]]);
        }
      });
    });

    setDataFiltered(dataTemp.length ? dataTemp : []);

  } catch (error) {
    console.error(error);
    setSomethingWrong(true)
  }
};

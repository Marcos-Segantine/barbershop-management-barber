import {getMonth} from './getMonth';
import {getDay} from './getDay';
import {getProfessional} from './getProfessional';

import {verifySchedules} from './verifySchedules';

import firestore from '@react-native-firebase/firestore';

export const cancelScheduleFuntion = (uidClient, item, navigation) => {
  const sheduleMouth = getMonth(item);
  const scheduleDay = getDay(item);
  const professional = getProfessional(item);
  firestore()
    .collection('schedules_by_user')
    .doc(uidClient)
    .get()
    .then(({_data}) => {
      const newSchedules__Temp = _data.schedules.filter(itemFilter => {
        return itemFilter.scheduleUid !== item.scheduleUid;
      });

      _data.schedules = newSchedules__Temp;

      firestore()
        .collection('schedules_by_user')
        .doc(uidClient)
        .update({..._data});
    });

  firestore()
    .collection('schedules_month')
    .doc(`${sheduleMouth}_2023`)
    .get()
    .then(({_data}) => {
      delete _data[scheduleDay][professional][item.shedule];

      firestore()
        .collection('schedules_month')
        .doc(`${sheduleMouth}_2023`)
        .update({..._data});
    });

  firestore()
    .collection('unavailable_times')
    .doc(`${sheduleMouth}_2023`)
    .get()
    .then(({_data}) => {
      const newData = _data[scheduleDay][professional].filter(schedule => {
        return schedule !== item.shedule;
      });

      _data[scheduleDay][professional] = newData;

      firestore()
        .collection('unavailable_times')
        .doc(`${sheduleMouth}_2023`)
        .update({..._data})
        .then(() => {
          verifySchedules(item);

          navigation.navigate('InitialScreen');
        });
    });
};

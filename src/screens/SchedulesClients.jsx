import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { Day } from '../components/Day';
import { Title } from '../components/Title';

import { globalStyles } from '../globalStyles';

import { useFocusEffect } from '@react-navigation/native';

import { fetchDataSchedulesClients } from '../functions/schedules/fetchDataSchedulesClients';

import firestore from '@react-native-firebase/firestore';

export const SchedulesClients = () => {
  const [dataFiltered, setDataFiltered] = useState();

  const schedulesMonthRef = firestore().collection('schedules_month')

  // listener that update the `dataFiltered` all the times that `schedules_month` collection is updated
  useEffect(() => {
    const unsubscribe = schedulesMonthRef.onSnapshot(() => {
      fetchDataSchedulesClients(setDataFiltered);
    });
    return () => unsubscribe();
  }, []);

  // set initial data in to `dataFiltered` all the `SchedulesClients` is focused
  useFocusEffect(
    useCallback(() => {
      fetchDataSchedulesClients(setDataFiltered);
    }, []),
  );

  return (
    <View style={globalStyles.container}>
      <Title title={'Datas de Agendamento'} />

      <View style={style.contentDays}>
        {dataFiltered
          ? dataFiltered.map((day, index) => {
            return <Day key={index} day={day.day} />;
          })
          : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
    marginTop: 20,
  },
});

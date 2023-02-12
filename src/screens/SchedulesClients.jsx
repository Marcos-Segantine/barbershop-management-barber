import {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import {Day} from '../components/Day';
import {Title} from '../components/Title';

import {globalStyles} from '../globalStyles';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

export const SchedulesClients = () => {
  const [dataFiltered, setDataFiltered] = useState();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const {email} = auth().currentUser;

        firestore()
          .collection('barbers')
          .where('email', '==', email)
          .get()
          .then(({_docs}) => {
            const {name} = _docs[0]._data;

            firestore()
              .collection('schedules_month')
              .get()
              .then(({_docs}) => {
                const dataTemp = [];

                for (let month in _docs) {
                  const data = _docs[month]._data;

                  for (let day in data) {
                    if (
                      data[day][name] &&
                      Object.keys(data[day][name]).length > 0
                    ) {
                      const key = Object.keys(data[day][name]);

                      dataTemp.push(data[day][name][key]);
                    }
                  }
                }

                setDataFiltered(dataTemp);
              });
          });
      })();
    }, []),
  );

  return (
    <View style={globalStyles.container}>
      <Title title={'Datas de Agendamento'} />

      <View style={style.contentDays}>
        {dataFiltered
          ? dataFiltered.map((day, index) => {
              return (
                <Day
                  key={index}
                  day={day.day}
                  scheduleUid={day.scheduleUid}
                  schedules={day}
                />
              );
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

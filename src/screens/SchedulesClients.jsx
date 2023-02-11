import {useFocusEffect} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Day} from '../components/Day';
import {Title} from '../components/Title';

import {globalStyles} from '../globalStyles';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const SchedulesClients = () => {
  const [dataFiltered, setDataFiltered] = useState();

  const user = auth().currentUser;

  useEffect(() => {
    firestore()
      .collection('barbers')
      .where('email', '==', user.email)
      .get()
      .then(({_docs}) => {
        const barberName = _docs[0]._data.name;

        firestore()
          .collection('schedules_month')
          .get()
          .then(({_docs}) => {
            const dataTemp = [];
            for (let count = 0; count < _docs.length; count++) {
              const month = _docs[count]._data;

              for (const day in month) {
                if (month[day][barberName]) {
                  const key = String(Object.keys(month[day][barberName]));

                  dataTemp.push(month[day][barberName][key].day);
                }
              }
            }
            setDataFiltered(dataTemp);
          });
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Title title={'Datas de Agendamento'} />

      <View style={style.contentDays}>
        {dataFiltered
          ? dataFiltered.map((day, index) => {
              return <Day day={day} key={index} />;
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

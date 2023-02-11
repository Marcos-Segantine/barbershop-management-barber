import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Day} from '../components/Day';
import {Title} from '../components/Title';

import {globalStyles} from '../globalStyles';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const SchedulesClients = () => {
  const [dataFiltered, setDataFiltered] = useState();

  useEffect(() => {
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

              for (const month in _docs) {
                const dataFormated = _docs[month]._data;

                for (let inDay in dataFormated) {
                  if (dataFormated[inDay][name]) {
                    const key = Object.keys(dataFormated[inDay][name])[0];

                    dataTemp.push(dataFormated[inDay][name][key]);
                  }
                }
              }

              setDataFiltered(dataTemp);
            });
        });
    })();
  }, []);

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

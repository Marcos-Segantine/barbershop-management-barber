import {useEffect, useState, useCallback, useContext} from 'react';
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
      const fetchData = async () => {
        const {email} = auth().currentUser;
        const barbersQuerySnapshot = await firestore()
          .collection('barbers')
          .where('email', '==', email)
          .get();
        const barberName = barbersQuerySnapshot.docs[0].data().name;

        const schedulesQuerySnapshot = await firestore()
          .collection('schedules_month')
          .get();
        const dataTemp = [];
        schedulesQuerySnapshot.forEach(doc => {
          const data = doc.data();
          Object.keys(data).forEach(day => {
            const barberSchedule = data[day][barberName];
            if(!barberSchedule) return
            const keys__barberSchedule = Object.keys(barberSchedule)
            if (barberSchedule && keys__barberSchedule.length > 0) {
              dataTemp.push(barberSchedule[Object.keys(barberSchedule)[0]]);
            }
          });
        });
        setDataFiltered(dataTemp);
      };
      fetchData();
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

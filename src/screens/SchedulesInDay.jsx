import {View, Text, StyleSheet, Pressable} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';

export const SchedulesInDay = ({route}) => {
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  const {day} = route.params;

  useEffect(() => {
    const year = day.split('').splice(0, 4).join('');
    const month = day.split('').splice(5, 2).join('');
    const daySchedule = day.split('').splice(8).join('');

    const dateFormated = month + '_' + year;

    firestore()
      .collection('schedules_month')
      .doc(dateFormated)
      .get()
      .then(({_data}) => {
        const dataTemp = [];

        for (const dataPerSchedule in _data) {
          if (dataPerSchedule === daySchedule) {
            for (let dataPerDay in _data[daySchedule]['Barbeiro 1']) {
              dataTemp.push(_data[daySchedule]['Barbeiro 1'][dataPerDay]);
            }
          }
        }

        setData(dataTemp);
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Title title={data ? data[0].day : null} />

      <View style={style.contentSchedules}>
        {data
          ? data.map((data, index) => {
              return (
                <Pressable
                  key={index}
                  style={style.schedule}
                  onPress={() =>
                    navigation.navigate('ScheduleDetails', {data})
                  }>
                  <Text style={style.scheduleText}>{data.shedule}</Text>
                  <View style={style.thereIsSchedule}></View>
                </Pressable>
              );
            })
          : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentSchedules: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  schedule: {
    marginTop: 15,
    borderWidth: 3,
    borderRadius: 20,
    width: '80%',
    borderColor: '#E95401',
    position: 'relative',
    paddingVertical: 5,
  },

  scheduleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
  },

  thereIsSchedule: {
    backgroundColor: '#0EBC0A',
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    top: '30%',
    width: 20,
    height: 20,
  },
});

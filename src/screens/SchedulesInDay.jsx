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

  const year = day.split('').splice(0, 4).join('');
  const month = day.split('').splice(5, 2).join('');
  const daySchedule = day.split('').splice(8).join('');

  const dateFormated = month + '_' + year;

  useEffect(() => {
    firestore()
      .collection('working_hours')
      .get()
      .then(({_docs}) => {
        const working_hours = _docs[0]._data.times;

        firestore()
          .collection('schedules_month')
          .doc(dateFormated)
          .get()
          .then(({_data}) => {
            const keys = Object.keys(_data[daySchedule]['Barbeiro 1']);

            const result = working_hours.map(hour => {
              if (keys.includes(hour)) {
                return {
                  hour: hour,
                  marked: true,
                };
              } else {
                return {
                  hour: hour,
                  marked: false,
                };
              }
            });

            setData(result);
          });
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Title title={daySchedule + ' / ' + month + ' / ' + year} />

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
                  <Text style={style.scheduleText}>{data.hour}</Text>
                  <View
                    style={
                      data.marked
                        ? style.thereIsSchedule
                        : style.thereIsNoSchedule
                    }></View>
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
    marginTop: 15,
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
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    top: '30%',
    width: 20,
    height: 20,
  },

  thereIsNoSchedule: {
    backgroundColor: '#0EBC0A',
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    top: '30%',
    width: 20,
    height: 20,
  },
});

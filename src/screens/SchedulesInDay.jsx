import { View, Text, StyleSheet, Pressable } from 'react-native';

import { globalStyles } from '../globalStyles';

import { Title } from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

export const SchedulesInDay = ({ route }) => {
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  const { day } = route.params;

  const year = day.split('').splice(0, 4).join('');
  const month = day.split('').splice(5, 2).join('');
  const daySchedule = day.split('').splice(8).join('');

  const dateFormated = month + '_' + year;

  const date = new Date(day).getDay() + 1
  const weekday = date <= 5 ? 2 : date - 6

  useEffect(() => {

    (async () => {
      const workingHoursRef = await firestore().collection("working_hours").get()
      const workingHoursData = workingHoursRef._docs[weekday]._data.times

      const unavailableTimesRef = firestore().collection("unavailable_times").doc(dateFormated)
      const unavailableTimesData = (await unavailableTimesRef.get()).data()[daySchedule]["Barbeiro 1"]

      const dataTemp = workingHoursData.map(workingHour => {
        if (unavailableTimesData.includes(workingHour)) {
          return {
            day: day,
            isScheduleFree: false,
            hour: workingHour
          }
        } else {
          return {
            day: day,
            isScheduleFree: true,
            hour: workingHour
          }
        }
      })

      setData(dataTemp)
    })();

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
                  navigation.navigate('ScheduleDetails', {
                    day: data.day,
                    hour: data.hour,
                    isScheduleFree: data.isScheduleFree
                  })
                }>
                <Text style={style.scheduleText}>{data.hour}</Text>
                <View
                  style={
                    data.isScheduleFree
                      ? style.thereIsNoSchedule
                      : style.thereIsSchedule
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

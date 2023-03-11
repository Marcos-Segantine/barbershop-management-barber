import { View, Text, StyleSheet, Pressable } from 'react-native';

import { globalStyles } from '../globalStyles';

import { Title } from '../components/Title';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { getSchedulesInDay } from '../functions/schedules/getSchedulesInDay';

import firestore from '@react-native-firebase/firestore';

export const SchedulesInDay = ({ route }) => {
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  const { day } = route.params;

  const year = day.split('').splice(0, 4).join('');
  const month = day.split('').splice(5, 2).join('');
  const daySchedule = day.split('').splice(8).join('');

  const date = new Date(day).getDay() + 1
  const weekday = date <= 5 ? 2 : date - 6

  const dateFormated = month + '_' + year;

  // listener that update the data all the times that `working_hours` collection is updated
  useEffect(() => {
    const workingHoursRef = firestore().collection("working_hours")
    const unsubscribe = workingHoursRef.onSnapshot(() => {
      getSchedulesInDay(dateFormated, daySchedule, weekday, setData, day)

    })

    return () => unsubscribe()

  }, [])


  // listener that update the data all the times that `unavailable_times` collection is updated
  useEffect(() => {
    const unavailableTimesRef = firestore().collection("unavailable_times")
    const unsubscribe = unavailableTimesRef.onSnapshot(() => {
      getSchedulesInDay(dateFormated, daySchedule, weekday, setData, day)

    })

    return () => unsubscribe()
  }, [])


  // sets the initial data
  useEffect(() => {
    getSchedulesInDay(dateFormated, daySchedule, weekday, setData, day)

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

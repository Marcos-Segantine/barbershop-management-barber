import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../assets/globalStyles';

import { ComeBack } from '../components/ComeBack';
import { Loading } from '../components/Loading';

import { getSchedulesInDay } from '../services/schedules/getSchedulesInDay';

import { SomethingWrongContext } from '../context/SomethingWrongContext';
import { UserContext } from '../context/UserContext';

import { formatDate } from '../utils/formatDate';
import { getMonth, getYear } from '../utils/dateHelper';

export const SchedulesInDay = ({ route }) => {
  const [data, setData] = useState(null);

  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const navigation = useNavigation();
  const { day } = route.params;

  const year = getYear(day)
  const month = getMonth(day)

  const date = new Date(day).getDay() + 1
  const weekday = date <= 5 ? "weekday" : date === 6 ? "saturday" : "sunday"

  const dateFormatted = month + '_' + year;

  // listener that update the data all the times that `working_hours` collection is updated
  useEffect(() => {

    const workingHoursRef = firestore().collection("working_hours")
    const unsubscribe = workingHoursRef.onSnapshot(() => {
      getSchedulesInDay(dateFormatted, day, weekday, { name: userData.name, uid: userData.uid }, setData, setSomethingWrong)

    })

    return () => unsubscribe()

  }, [])


  // listener that update the data all the times that `unavailable_times` collection is updated
  useEffect(() => {
    const unavailableTimesRef = firestore().collection("unavailable_times")
    const unsubscribe = unavailableTimesRef.onSnapshot(() => {
      getSchedulesInDay(dateFormatted, day, weekday, { name: userData.name, uid: userData.uid }, setData, setSomethingWrong)

    })

    return () => unsubscribe()
  }, [])

  const title = formatDate(day)

  if (data === null) return <Loading flexSize={1} />

  return (
    <View style={globalStyles.container}>

      <ComeBack text={title} />

      <View style={style.contentSchedules}>
        {
          data
          && data.map((data, index) => {
            return (
              <Pressable
                key={index}
                style={style.schedule}
                onPress={() =>
                  navigation.navigate('ScheduleDetails', {
                    day: data.day,
                    hour: data.hour,
                    isScheduleFree: data.isScheduleFree,
                    date: data.date
                  })
                }
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={style.scheduleText}>{data.hour}</Text>
                  <View style={data.isScheduleFree ? [style.status, { backgroundColor: "green" }] : [style.status, { backgroundColor: "red" }]}></View>
                </View>
                <Text style={style.nameCLientText}>{data.isScheduleFree ? "Horário livre" : data.clientName}</Text>
              </Pressable>
            );
          })
        }

      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentSchedules: {
    width: '100%',
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 15,
  },

  schedule: {
    width: '47%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: "5%",
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
  },

  status: {
    borderRadius: 100,
    width: 20,
    height: 20,
  },

  scheduleText: {
    color: '#000000',
    fontWeight: globalStyles.fontFamilyBold,
    textAlign: 'center',
    fontSize: globalStyles.fontSizeSmall,
  },

  nameCLientText: {
    color: '#000000',
    marginTop: 10,
    fontSize: globalStyles.fontSizeVerySmall,
  },
});

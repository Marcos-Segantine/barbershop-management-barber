import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../assets/globalStyles';
import { FreeTimeImage } from '../assets/imgs/FreeTimeImage';

import { ComeBack } from '../components/ComeBack';
import { Loading } from '../components/Loading';

import { getSchedulesInDay } from '../services/schedules/getSchedulesInDay';

import { SomethingWrongContext } from '../context/SomethingWrongContext';
import { UserContext } from '../context/UserContext';

import { formatDate } from '../utils/formatDate';
import { getMonth, getYear, getDay } from '../utils/dateHelper';
import { getNameLastName } from '../utils/getNameLastName';

export const SchedulesInDay = ({ route }) => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(true)

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
      getSchedulesInDay(dateFormatted, day, weekday, { name: userData.name, uid: userData.uid }, setData, filter, setSomethingWrong)

    })

    return () => unsubscribe(filter)

  }, [])

  // listener that update the data all the times that `unavailable_times` collection is updated
  useEffect(() => {
    const unavailableTimesRef = firestore().collection("unavailable_times")
    const unsubscribe = unavailableTimesRef.onSnapshot(() => {
      getSchedulesInDay(dateFormatted, day, weekday, { name: userData.name, uid: userData.uid }, setData, filter, setSomethingWrong)

    })

    return () => unsubscribe()
  }, [filter])

  const handleFilter = () => {
    setFilter(!filter)
  }

  const buttonFilterStyles = filter ?
    { backgroundColor: '#FFFFFF', width: 40, height: "100%", borderRadius: 300, position: "absolute", right: 2, top: 2 } :
    { backgroundColor: '#F2F2F2', width: 40, height: "100%", borderRadius: 300, position: "absolute", left: 2, top: 2 };

  const title = formatDate(day)

  // console.log(data);

  if (data === null) return <Loading flexSize={1} />

  return (
    <View style={globalStyles.container}>

      <ComeBack text={title} />

      <View style={style.contentSchedules}>

        {
          getDay(day) === getDay() &&
          <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
            <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeMedium }}>Filtrar horários?</Text>

            <Pressable
              onPress={handleFilter}
              style={{ width: 80, height: 35, borderRadius: 100, backgroundColor: filter ? globalStyles.orangeColor : "#B8B8B8", padding: 2 }}
            >
              <View style={buttonFilterStyles}></View>
            </Pressable>
          </View>
        }
        {
          data.length ?
            data.map((data, index) => {
              return (
                <Pressable
                  key={index}
                  style={style.schedule}
                  onPress={() =>
                    navigation.navigate('ScheduleDetails', {
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
                  <Text style={style.nameCLientText}>{data.isScheduleFree ? "Horário livre" : getNameLastName(data.clientName)}</Text>
                </Pressable>
              );
            }) :
            <>
              <Text style={{color: "#00000090", fontSize: globalStyles.fontSizeSmall, textAlign: "center", width: "100%", marginTop: 40 }}>Não há mais nenhum horário para hoje</Text>
              <FreeTimeImage height={400} width={"100%"} />
            </>
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
    fontFamily: globalStyles.fontFamilyBold,
    textAlign: 'center',
    fontSize: globalStyles.fontSizeSmall,
  },

  nameCLientText: {
    color: '#000000',
    marginTop: 10,
    fontSize: globalStyles.fontSizeVerySmall,
  },
});

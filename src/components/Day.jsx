import { Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { useContext, useState } from 'react';
import { ScheduleContext } from '../context/ScheduleContext';
import { UserContext } from '../context/UserContext';

import { useNavigation } from '@react-navigation/native';

import { formatDate } from '../utils/formatDate';

import groupIcon from "../assets/icons/groupIcon.png"
import { DayWeek } from '../assets/icons/DayWeekIcon';

import { getNumberOfSchedules } from '../services/schedules/getNumberOfSchedules';
import { getDayOfWeek } from '../utils/getDayOfWeek';
import { globalStyles } from '../assets/globalStyles';

export const Day = ({ day }) => {
  const [numberOfSchedules, setNumberOfSchedules] = useState(0)
  const [dayOfWeek, setdayOfWeek] = useState("")
  const navigation = useNavigation();

  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { userData } = useContext(UserContext)

  const handleClick = () => {
    setSchedule({ ...schedule, day: day })

    navigation.navigate('SchedulesInDay', { day });
  };

  (async () => {
    setNumberOfSchedules(await getNumberOfSchedules(userData.uid, day))
    setdayOfWeek(getDayOfWeek(day))

  })();

  const dayFormated = formatDate(day)

  return (
    <Pressable style={styles.btn} onPress={handleClick}>
      <Text style={styles.text}>{dayFormated}</Text>

      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={groupIcon} style={styles.icon} />
          <Text style={{ color: "#00000090", marginLeft: 8, fontSize: globalStyles.fontSizeVerySmall }}>{numberOfSchedules}</Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <DayWeek width={15} height={15} />
          <Text style={{ color: "#00000090", marginLeft: 8, fontSize: globalStyles.fontSizeVerySmall }}>{dayOfWeek}</Text>
        </View>

      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '47%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
  },

  text: {
    fontFamily: globalStyles.fontFamilyBold,
    textAlign: 'center',
    color: '#000000',
  },

  icon: {
    width: 15,
    height: 15
  }
});

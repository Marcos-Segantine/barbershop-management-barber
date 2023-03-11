import { Text, View, StyleSheet } from 'react-native';

import { Title } from '../components/Title';
import { Button } from '../components/Button';

import { useContext, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../globalStyles';

import { dateFormated } from '../functions/helpers/dateFormated';

import { getYear, getDay, getMonth } from '../functions/helpers/getDate';

import { addScheduleWhenDayAlredyUse } from '../functions/schedules/addScheduleWhenDayAlredyUse';
import { addScheduleWhenDayNotUse } from '../functions/schedules/addScheduleWhenDayNotUse';
import { addScheduleWhenMonthIsNotUse } from '../functions/schedules/addScheduleWhenMonthIsNotUse';

import { useIsFocused } from '@react-navigation/native';
import { AddScheduleContext } from '../context/AddSchedule';
import { UserDataContext } from '../context/UserData';


export const ConfirmNewSchedule = ({ navigation }) => {
  const { schedule, setSchedule } = useContext(AddScheduleContext);
  const { user } = useContext(UserDataContext);

  const date = dateFormated(schedule);

  const isFocused = useIsFocused();

  useEffect(() => {
    schedule.scheduleUid = `${schedule.client.uid}-${schedule.day}-${user.name}-${schedule.client.shedule}-${schedule.client.service}`;
  }, [isFocused]);

  const handleComfirm = async () => {
    const sheduleMouth = getMonth(schedule);
    const sheduleDay = getDay(schedule);
    const sheduleYear = getYear(schedule)

    const dateForDoc = `${sheduleMouth}_${sheduleYear}`

    firestore()
      .collection('schedules_month')
      .doc(dateForDoc)
      .get()
      .then(({ _data }) => {
        if (_data === undefined) {
          addScheduleWhenMonthIsNotUse(
            schedule,
            navigation,
            schedule,
            setSchedule,
          );
          return;
        }

        const dayIsAlredyUse = _data[sheduleDay];

        dayIsAlredyUse
          ? addScheduleWhenDayAlredyUse(navigation, schedule.client, schedule, user.name)
          : addScheduleWhenDayNotUse(
            schedule,
            navigation,
            schedule,
            setSchedule,
          );
      });
  };

  return (
    <View style={globalStyles.container}>
      <Title title="O seu agendamento:" />

      <Text style={style.subTitle}>Confira todos os dados</Text>

      <View style={style.contentData}>
        <View style={style.data}>
          <Text style={style.textData}>Dia: {date}</Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>Serviço: {schedule.client.service}</Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>
            Profissional: {user.name}
          </Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>Horário: {schedule.client.shedule}</Text>
        </View>
      </View>

      <Button text="Confirmar" action={handleComfirm} />
    </View>
  );
};

const style = StyleSheet.create({
  subTitle: {
    fontSize: 12,
    color: '#FFFFFF60',
  },

  contentData: {
    width: '85%',
    marginTop: 30,
  },

  data: {
    borderColor: '#E95401',
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 5,
  },

  textData: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

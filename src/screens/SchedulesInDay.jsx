import {View, Text, StyleSheet, Pressable} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';

export const SchedulesInDay = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={'Dia 09 de Setembro'} />

      <View style={style.contentSchedules}>
        <Pressable style={style.schedule}>
          <Text style={style.scheduleText}>09:00</Text>
          <View style={style.thereIsSchedule}></View>
        </Pressable>

        <Pressable style={style.schedule}>
          <Text style={style.scheduleText}>09:00</Text>
          <View style={style.thereIsSchedule}></View>
        </Pressable>

        <Pressable style={style.schedule}>
          <Text style={style.scheduleText}>09:00</Text>
          <View style={style.thereIsSchedule}></View>
        </Pressable>

        <Pressable style={style.schedule}>
          <Text style={style.scheduleText}>09:00</Text>
          <View style={style.thereIsSchedule}></View>
        </Pressable>

        <Pressable style={style.schedule}>
          <Text style={style.scheduleText}>09:00</Text>
          <View style={style.thereIsSchedule}></View>
        </Pressable>
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

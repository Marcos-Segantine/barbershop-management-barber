import {useNavigation} from '@react-navigation/native';
import { useContext } from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {AddScheduleContext} from '../Context/AddSchedule';

export const Day = ({day}) => {
  const navigation = useNavigation();

  const {schedule, setSchedule} = useContext(AddScheduleContext);

  const handleClick = () => {
    setSchedule({...schedule, day: day})
    
    navigation.navigate('SchedulesInDay', {day});
  };

  return (
    <Pressable style={style.btn} onPress={handleClick}>
      <Text style={style.text}>{day}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  btn: {
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    width: '30%',
    paddingVertical: 10,
    marginLeft: 10,
    marginTop: 10,
  },

  text: {
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

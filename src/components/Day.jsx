import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, StyleSheet} from 'react-native';

export const Day = ({day}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={style.btn}
      onPress={() => navigation.navigate('SchedulesInDay')}>
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

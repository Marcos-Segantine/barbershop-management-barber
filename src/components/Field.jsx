import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export const Field = ({text, navigateScreen}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={style.link}
      onPress={() => navigation.navigate(navigateScreen)}>
      <Text style={style.text}>{text}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  link: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 17,
    borderWidth: 3,
    borderColor: '#E95401',
    marginVertical: 5,
    borderRadius: 20,
  },

  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});

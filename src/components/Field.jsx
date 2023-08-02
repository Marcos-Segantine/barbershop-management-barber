import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import { globalStyles } from '../assets/globalStyles';

export const Field = ({text, navigateScreen = false}) => {
  const navigation = useNavigation();

  return navigateScreen ? (
    <Pressable
      style={style.link}
      onPress={() => navigation.navigate(navigateScreen)}>
      <Text style={style.text}>{text}</Text>
    </Pressable>
  ) : (
    <View style={style.link}>
      <Text style={style.text}>{text}</Text>
    </View>
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
    fontFamily: globalStyles.fontFamilyBold,
    textAlign: 'center',
  },
});

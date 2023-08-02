import {Text, StyleSheet} from 'react-native';

import { globalStyles } from '../assets/globalStyles';

export const Title = ({title}) => {
  return <Text style={style.title}>{title}</Text>;
};

const style = StyleSheet.create({
  title: {
    fontSize: 34,
    fontFamily: globalStyles.fontFamilyBold,
    color: '#FFFFFF',
    paddingHorizontal: 10,
    width: '100%',
    textAlign: 'center',
  },
});

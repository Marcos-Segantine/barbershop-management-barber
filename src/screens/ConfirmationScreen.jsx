import {View, StyleSheet, Pressable, Text} from 'react-native';

import {globalStyles} from '../globalStyles';

import ComfirmationSvg from '../assets/ComfirmationSvg';

import {Title} from '../components/Title';

export const ConfirmationScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={'Cliente desmarcado'} />

      <ComfirmationSvg />

      <Pressable style={style.button}>
        <Text style={style.textButton}>Voltar ao início</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 10,
    width: '55%',
  },

  textButton: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    color: '#E95401'
  }
});

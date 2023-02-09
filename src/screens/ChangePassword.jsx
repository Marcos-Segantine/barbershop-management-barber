import {View, Text, StyleSheet, TextInput} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Button} from '../components/Button';

export const ChangePassword = () => {
  return (
    <View style={globalStyles.container}>
      <View style={style.content}>
        <TextInput style={style.input} placeholder="Senha Atual" />

        <TextInput style={style.input} placeholder="Nova senha" />

        <TextInput style={style.input} placeholder="Repita a nova senha" />
      </View>

      <Button text={'Redefinir senha'} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 50,
    marginBottom: 25,
    alignItems: 'center',
  },

  input: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 17,
    borderWidth: 3,
    borderColor: '#E95401',
    marginVertical: 5,
    borderRadius: 20,
  },
});

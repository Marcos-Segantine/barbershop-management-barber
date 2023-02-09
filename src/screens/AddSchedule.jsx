import {View, TextInput, StyleSheet} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Button} from '../components/Button';

export const AddSchedule = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={'Agendamento de cliente'} />

      <View style={style.cotent}>
        <TextInput style={style.input} placeholder="Nome" />

        <TextInput style={style.input} placeholder="Email" />

        <TextInput style={style.input} placeholder="Telefone" />
      </View>

      <Button text={'Comfirmar'} />
    </View>
  );
};

const style = StyleSheet.create({
  cotent: {
    marginTop: 50,
    marginBottom: 40,
    width: '100%',
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

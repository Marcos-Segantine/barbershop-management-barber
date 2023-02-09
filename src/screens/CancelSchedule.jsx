import {View, StyleSheet, Text, TextInput} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Button} from '../components/Button';

export const CancelSchedule = () => {
  return (
    <View style={globalStyles.container}>
      <Title  title={"Motivo do cancelamento"} />
      
      <TextInput
        style={style.input}
        placeholder="Descreva o motivo do cancelamento..."
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Button text={"Confirmar"} />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    width: '80%',
    height: '50%',
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 25,
  },
});

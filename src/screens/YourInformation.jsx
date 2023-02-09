import {View, StyleSheet, Text} from 'react-native';

import {Field} from '../components/Field';
import {Button} from '../components/Button';

import {globalStyles} from '../globalStyles';

export const YourInformation = () => {
  return (
    <View style={globalStyles.container}>
      <View style={style.content}>
        <Field text={'Nome: NOME BARBER'} />

        <Field text={'Email: aaçslkdaçlksd@gmail.com'} />

        <Field text={'Telefone: 654354654'} />
      </View>

      <Button text="Mudar informações" action={() => {}} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    marginTop: '15%',
    marginBottom: '15%',
    width: '95%',
    alignItems: 'center',
  },
});

import {StyleSheet, View, Text} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Field} from '../components/Field';
import {Button} from '../components/Button';

export const ScheduleDetails = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={'Horario de 15:00'} />

      <View style={style.content}>
        <Field text={'Nome: çalksdçlaksd'} />

        <Field text={'Nome: çalksdçlaksd'} />

        <Field text={'Nome: çalksdçlaksd'} />
      </View>

      <Button text={'Cancelar agendamento'} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 75,
    marginBottom: 25,
    alignItems: 'center',
  },
});

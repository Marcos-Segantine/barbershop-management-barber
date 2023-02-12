import {StyleSheet, View, Text} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Field} from '../components/Field';
import {Button} from '../components/Button';

import {cancelScheduleFuntion} from '../functions/Schedules/cancelScheduleFuntion';
import {useEffect, useState} from 'react';


export const ScheduleDetails = ({route, navigation}) => {
  const [thereAreSchedule, setThereareSchedule] = useState();

  const {data} = route.params;
  useEffect(() => {
    if (data) setThereareSchedule(true);
    else setThereareSchedule(false);
  }, []);

  return (
    <View style={globalStyles.container}>
      {thereAreSchedule ? (
        <Title title={`Horario de ${data.shedule} do dia ${data.day}`} />
      ) : null}

      {thereAreSchedule ? (
        <View style={style.content}>
          <Field text={`Nome: ${data.name}`} />

          <Field text={`Email: ${data.email}`} />

          <Field text={`Telefone: ${data.phone}`} />

          <Field text={`Serviço: ${data.service}`} />
        </View>
      ) : (
        <View style={[style.content, {flex: 0.7}]}>
          <Text style={style.text}>Sem agendamento</Text>
        </View>
      )}

      {thereAreSchedule ? (
        <Button
          text={'Cancelar agendamento'}
          action={() => cancelScheduleFuntion(data.uid, data, navigation)}
        />
      ) : (
        <Button
          text={'Agendar cliente'}
          action={() => navigation.navigate('AddSchedule')}
        />
      )}
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

  input: {
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
    fontSize: 30,
  },
});

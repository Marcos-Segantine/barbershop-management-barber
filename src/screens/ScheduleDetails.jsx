import {StyleSheet, View, Text} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Field} from '../components/Field';
import {Button} from '../components/Button';

import {cancelScheduleFuntion} from '../functions/Schedules/cancelScheduleFuntion';
import {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';

export const ScheduleDetails = ({route, navigation}) => {
  const [client, setClient] = useState();

  const {data} = route.params;

  useEffect(() => {
    const clientUid = data.scheduleUid.split('').splice(0, 28).join('');

    firestore()
      .collection('users')
      .doc(clientUid)
      .get()
      .then(({_data}) => {
        setClient(_data);
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Title title={'Horario de 15:00'} />

      <View style={style.content}>
        <Field text={`Nome: ${data.name}`} />

        <Field text={`Email: ${data.email}`} />

        <Field text={`Telefone: ${data.phone}`} />

        <Field text={`Serviço: ${data.service}`} />
      </View>

      <Button
        text={'Cancelar agendamento'}
        action={() => cancelScheduleFuntion(client, data, navigation)}
      />
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

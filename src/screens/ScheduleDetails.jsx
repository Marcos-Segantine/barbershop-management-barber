import { StyleSheet, View, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { globalStyles } from '../globalStyles';

import { Title } from '../components/Title';
import { Field } from '../components/Field';
import { Button } from '../components/Button';

import { getScheduleByDateAndHour } from '../functions/schedules/getScheduleByDateAndHour';
import { cancelScheduleFuntion } from '../functions/schedules/cancelScheduleFuntion';

import { AddScheduleContext } from '../Context/AddSchedule';
import { UserDataContext } from '../Context/UserData';

export const ScheduleDetails = ({ route, navigation }) => {
  const [isScheduleFree, setIsScheduleFree] = useState(route.params.isScheduleFree);
  const [data, setData] = useState(null)

  const { schedule, setSchedule } = useContext(AddScheduleContext);
  const { user } = useContext(UserDataContext)

  const { hour, day } = route.params;

  useEffect(() => {
    (async () => {
      setData(
        await getScheduleByDateAndHour(isScheduleFree, user, hour, route)
      );

    })();

  }, []);

  return (
    <View style={globalStyles.container}>
      {
        !isScheduleFree && data ?
          (
            <>
              <Title title={`Horario de ${hour} do dia ${day}`} />

              <View style={style.content}>
                <Field text={`Nome: ${data.name}`} />

                <Field text={`Email: ${data.email}`} />

                <Field text={`Telefone: ${data.phone}`} />

                <Field text={`Serviço: ${data.service}`} />
              </View>

              <Button
                text={'Cancelar agendamento'}
                action={() => cancelScheduleFuntion(data.uid, data, navigation)}
              />
            </>
          ) : (
            <View style={style.content}>
              <Text style={style.text}>Sem agendamento</Text>

              <Button
                text={'Agendar cliente'}
                action={() => navigation.navigate('AddSchedule')}
              />
            </View>
          )
      }
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

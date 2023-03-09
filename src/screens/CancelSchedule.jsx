import { View, StyleSheet, TextInput } from 'react-native';

import { globalStyles } from '../globalStyles';

import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { cancelScheduleFuntion } from '../functions/schedules/cancelScheduleFuntion';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ConfirmCancelSchedule } from '../components/modals/ConfirmCancelSchedule';

export const CancelSchedule = ({ route }) => {
  const [modalConfirmation, setModalConfirmation] = useState(false)

  const { data, user } = route.params

  const navigation = useNavigation()

  const cancelSchedule = () => {
    cancelScheduleFuntion(data.uid, data, navigation, user.name)

    setModalConfirmation(false)
  }

  return (
    <View style={globalStyles.container}>
      <ConfirmCancelSchedule
        visible={modalConfirmation}
        setModalConfirmation={setModalConfirmation}
        action={cancelSchedule}
        dataSchedule={data}
      />

      <Title title={"Motivo do cancelamento"} />

      <TextInput
        style={style.input}
        placeholder="Descreva o motivo do cancelamento..."
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Button text={"Confirmar"} action={() => setModalConfirmation(true)} />
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

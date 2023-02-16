import {View, TextInput, StyleSheet} from 'react-native';

import {globalStyles} from '../globalStyles';

import {Title} from '../components/Title';
import {Button} from '../components/Button';
import {useContext, useState} from 'react';

import {AddScheduleContext} from '../Context/AddSchedule';

import {getUserDataByEmailOrPhone} from '../functions/helpers/getUserDataByEmailOrPhone';

import {Services} from '../components/modals/Services';

export const AddSchedule = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [modaServicelVisible, setModalServiceVisible] = useState(false);

  const {schedule, setSchedule} = useContext(AddScheduleContext);

  return (
    <View style={globalStyles.container}>
      <Services
        modalVisible={modaServicelVisible}
        setModalVisible={setModalServiceVisible}
      />

      <Title title={'Agendamento de cliente'} />

      <View style={style.cotent}>
        <TextInput
          style={style.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={style.input}
          placeholder="Telefone"
          onChangeText={text => setPhone(text)}
          keyboardType="numeric"
        />
      </View>

      <Button
        text={'Comfirmar'}
        action={() =>
          getUserDataByEmailOrPhone(email, phone, schedule, setSchedule, setModalServiceVisible)
        }
      />
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

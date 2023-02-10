import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Field} from '../components/Field';

import {globalStyles} from '../globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

import {useContext} from 'react';
import {UserDataContext} from '../Context/UserData';

export const Menu = ({navigation}) => {
  const {setUser, setUid} = useContext(UserDataContext);

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(async () => {
        AsyncStorage.removeItem('@barberApp__adm__email', async () => {
          navigation.navigate('Login');
        });
      });
  };

  return (
    <View style={[globalStyles.container, {paddingTop: '30%'}]}>
      <Field text={'Clientes Agendados'} navigateScreen="ScheduledClients" />

      <Field text={'Suas informações'} navigateScreen="YourInformation" />

      <Field text={'Redefinir senha'} navigateScreen="ChangePassword" />

      <Pressable style={style.btn} onPress={handleLogOut}>
        <Text style={style.text}>Sair</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
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
  },
});

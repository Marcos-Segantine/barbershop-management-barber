import {Text, Pressable, View, StyleSheet, TextInput} from 'react-native';

import {useContext, useState} from 'react';

import {Title} from '../components/Title';
import {Button} from '../components/Button';

import {globalStyles} from '../globalStyles';

import {UserDataContext} from '../Context/UserData';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser, uid} = useContext(UserDataContext);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem('@barberApp__adm__email', email);
      });
  };

  return (
    <View style={globalStyles.container}>
      <Title title="Preencha os campos" />

      <View style={style.form}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={style.input}
          placeholder="Email"
          placeholderTextColor={'#FFFFFF80'}
          keyboardType="email-address"
        />

        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={style.input}
          placeholder="Digite sua senha"
          placeholderTextColor={'#FFFFFF80'}
          secureTextEntry={true}
        />

        <Button text="Entrar" action={handleLogin} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    width: '80%',
    alignItems: 'center',
    marginTop: '5%',
  },

  input: {
    borderWidth: 3,
    borderColor: '#E95401',
    borderRadius: 20,
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 13,
    paddingVertical: 17,
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF80',
  },
});

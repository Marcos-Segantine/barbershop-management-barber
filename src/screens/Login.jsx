import { View, StyleSheet, TextInput } from 'react-native';

import { useState } from 'react';

import { Title } from '../components/Title';
import { Button } from '../components/Button';

import { globalStyles } from '../globalStyles';
import { signInWithEmailAndPassword } from '../functions/user/signInWithEmailAndPassword';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <Button text="Entrar" action={() => signInWithEmailAndPassword(email, password, navigation)} />
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

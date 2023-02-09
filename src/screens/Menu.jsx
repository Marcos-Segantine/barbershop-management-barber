import {View, Text, StyleSheet} from 'react-native';

import {Field} from '../components/Field';

import {globalStyles} from '../globalStyles';

export const Menu = () => {
  return (
    <View style={[globalStyles.container, {paddingTop: '30%'}]}>
      <Field text={'Clientes Agendados'} navigateScreen="ScheduledClients" />

      <Field text={'Suas informações'} navigateScreen="" />

      <Field text={'Redefinir senha'} navigateScreen="" />
    </View>
  );
};

const style = StyleSheet.create({});

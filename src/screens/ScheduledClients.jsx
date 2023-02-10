import {View, Text, StyleSheet} from 'react-native';

import {Day} from '../components/Day';
import {Title} from '../components/Title';

import {globalStyles} from '../globalStyles';

export const ScheduledClients = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={'Datas de Agendamento'} />

      <View style={style.contentDays}>
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
        <Day day="01/09" />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
    marginTop: 20,
  },
});

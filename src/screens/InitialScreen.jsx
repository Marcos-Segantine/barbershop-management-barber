import {Text, View} from 'react-native';

import {globalStyles} from '../globalStyles';

import { Title } from '../components/Title';

export const InitialScreen = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <Title title={'INITIAL SCREEN'} />

    </View>
  );
};

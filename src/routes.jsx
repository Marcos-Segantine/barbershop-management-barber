import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitialScreen} from './screens/InitialScreen';
import {Menu} from './screens/Menu';
import {ScheduledClients} from './screens/ScheduledClients';
import {YourInformation} from './screens/YourInformation';
import {ChangePassword} from './screens/ChangePassword';

const {Screen, Navigator} = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="InitialScreen" component={InitialScreen} />

      <Screen name="Menu" component={Menu} />

      <Screen name="ScheduledClients" component={ScheduledClients} />

      <Screen name="YourInformation" component={YourInformation} />

      <Screen name="ChangePassword" component={ChangePassword} />
    </Navigator>
  );
};

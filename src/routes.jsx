import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitialScreen} from './screens/InitialScreen';
import {Menu} from './screens/Menu';
import {ScheduledClients} from './screens/ScheduledClients';
import {YourInformation} from './screens/YourInformation';
import {ChangePassword} from './screens/ChangePassword';
import {SchedulesInDay} from './screens/SchedulesInDay';
import {ScheduleDetails} from './screens/ScheduleDetails';

const {Screen, Navigator} = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="InitialScreen" component={InitialScreen} />

      <Screen name="Menu" component={Menu} />

      <Screen name="ScheduledClients" component={ScheduledClients} />

      <Screen name="YourInformation" component={YourInformation} />

      <Screen name="ChangePassword" component={ChangePassword} />

      <Screen name="SchedulesInDay" component={SchedulesInDay} />

      <Screen name="ScheduleDetails" component={ScheduleDetails} />
    </Navigator>
  );
};

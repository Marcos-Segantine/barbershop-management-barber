import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitialScreen} from './screens/InitialScreen';
import {Menu} from './screens/Menu';
import {SchedulesClients} from './screens/SchedulesClients';
import {YourInformation} from './screens/YourInformation';
import {ChangePassword} from './screens/ChangePassword';
import {SchedulesInDay} from './screens/SchedulesInDay';
import {ScheduleDetails} from './screens/ScheduleDetails';
import {AddSchedule} from './screens/AddSchedule';
import {CancelSchedule} from './screens/CancelSchedule';
import {ConfirmationScreen} from './screens/ConfirmationScreen';
import {Login} from './screens/Login';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';

const {Screen, Navigator} = createNativeStackNavigator();

export const Routes = () => {
  const [initialScreen, setInitialScreen] = useState(null);

  useEffect(() => {
    (async () => {
      if ((await AsyncStorage.getItem('@barberApp__adm__email')) != null)
        setInitialScreen('SchedulesClients');
      else setInitialScreen('Login');
    })();
  }, []);

  if (!initialScreen) return;

  return (
    <Navigator
      initialRouteName={
        initialScreen === 'SchedulesClients' ? 'SchedulesClients' : 'Login'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="InitialScreen" component={InitialScreen} />

      <Screen name="Login" component={Login} />

      <Screen name="Menu" component={Menu} />

      <Screen name="SchedulesClients" component={SchedulesClients} />

      <Screen name="YourInformation" component={YourInformation} />

      <Screen name="ChangePassword" component={ChangePassword} />

      <Screen name="SchedulesInDay" component={SchedulesInDay} />

      <Screen name="ScheduleDetails" component={ScheduleDetails} />

      <Screen name="AddSchedule" component={AddSchedule} />

      <Screen name="CancelSchedule" component={CancelSchedule} />

      <Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    </Navigator>
  );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../screens/Welcome';
import { SchedulesClients } from '../screens/SchedulesClients';
import { Profile } from '../screens/Profile';
import { CreateNewPassword } from '../screens/CreateNewPassword';
import { SchedulesInDay } from '../screens/SchedulesInDay';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { AddSchedule } from '../screens/AddSchedule';
import { Login } from '../screens/Login';
import { ConfirmSchedule } from '../screens/ConfirmSchedule';
import { OurServices } from '../screens/OurServices';
import { GetClient } from '../screens/GetClient';
import { Home } from '../screens/Home';
import { FillProfile } from '../screens/FillProfile';
import { EditSchedulesOfWork } from '../screens/EditSchedulesOfWork';
import { EditServices } from '../screens/EditServices';
import { ChoiceInformationToEdit } from '../screens/ChoiceInformationToEdit';
import { Security } from '../screens/Security';
import { ForgotPassword } from '../screens/ForgotPassword';
import { BlockSpecificDays } from '../screens/BlockSpecificDays';
import { BlockSpecificTimes } from '../screens/BlockSpecificTimes';

const { Screen, Navigator } = createNativeStackNavigator();

export const Routes = () => {

  return (
    <Navigator
      initialRouteName='Welcome'
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        navigationBarColor: 'rgba(0,0,0,0.002))',
        statusBarColor: 'transparent',
      }}>

      <Screen name="Welcome" component={Welcome} />
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
      <Screen name="SchedulesClients" component={SchedulesClients} />
      <Screen name="Profile" component={Profile} />
      <Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Screen name="SchedulesInDay" component={SchedulesInDay} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="AddSchedule" component={AddSchedule} />
      <Screen name="ConfirmSchedule" component={ConfirmSchedule} />
      <Screen name="OurServices" component={OurServices} />
      <Screen name='GetClient' component={GetClient} />
      <Screen name='FillProfile' component={FillProfile} />
      <Screen name='EditSchedulesOfWork' component={EditSchedulesOfWork} />
      <Screen name='EditServices' component={EditServices} />
      <Screen name='ChoiceInformationToEdit' component={ChoiceInformationToEdit} />
      <Screen name='Security' component={Security} />
      <Screen name='ForgotPassword' component={ForgotPassword} />
      <Screen name='BlockSpecificDays' component={BlockSpecificDays} />
      <Screen name='BlockSpecificTimes' component={BlockSpecificTimes} />

    </Navigator>
  );
};

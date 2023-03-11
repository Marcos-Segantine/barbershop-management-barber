import {NavigationContainer} from '@react-navigation/native';

import {Header} from './src/shared/Header';

import {UserProvider} from './src/context/UserData';
import {AddScheduleProvider} from './src/context/AddSchedule';

import {Routes} from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <AddScheduleProvider>
          <Header />

          <Routes />
        </AddScheduleProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;

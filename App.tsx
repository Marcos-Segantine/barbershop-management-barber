import {NavigationContainer} from '@react-navigation/native';

import {Header} from './src/shared/Header';

import {UserProvider} from './src/Context/UserData';

import {Routes} from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Header />

        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;

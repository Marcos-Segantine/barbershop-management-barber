import {NavigationContainer} from '@react-navigation/native';

import {Header} from './src/shared/Header';

import { Routes } from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <Header />

      <Routes />
    </NavigationContainer>
  );
};

export default App;

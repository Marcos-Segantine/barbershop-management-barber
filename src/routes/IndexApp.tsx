import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from '../context/UserContext';
import { ScheduleProvider } from '../context/ScheduleContext';
import { MenuItemProvider } from '../context/MenuItemSelected';
import { SomethingWrongProvider } from '../context/SomethingWrongContext';
import { CreateNewPersonProvider } from '../context/CreateNewPerson';
import { SettingsProvider } from '../context/SettingsContext';

import { StatusBarComponent } from '../components/StatusBarComponent';
import { NetInformation } from '../components/modals/NetInformation';

import { Routes } from './routes';

export const IndexApp = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBarComponent />
        <ScheduleProvider>
          <MenuItemProvider>
            <SomethingWrongProvider>
              <CreateNewPersonProvider>
                <SettingsProvider>

                  <NetInformation />
                  <Routes />

                </SettingsProvider>
              </CreateNewPersonProvider>
            </SomethingWrongProvider>
          </MenuItemProvider>
        </ScheduleProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

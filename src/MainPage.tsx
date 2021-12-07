import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomePage} from './pages/HomePage';
import {DashboardPage} from './pages/dashboard_page/DashboardPage';
import {WalletProvider} from './WalletProvider';

const Stack = createNativeStackNavigator();

function MainPage() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={HomePage.name}
            component={HomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={DashboardPage.name}
            component={DashboardPage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}

export {MainPage};

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomePage} from './pages/HomePage';
import {BalancePage} from './pages/BalancePage';

const Stack = createNativeStackNavigator();

function MainPage() {
  return (
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
          name={BalancePage.name}
          component={BalancePage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {MainPage};
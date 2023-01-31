import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Unknown from './src/screens/Unknown';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from './src/context/ProductContext';
import Ingredients from './src/screens/Ingredients'

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} options={{ title: 'Bar Code Scanner'}}/>
          <Stack.Screen name='Details' component={Details} options={{ title: 'Details'}}/>
          <Stack.Screen name='Ingredients' component={Ingredients} options={{ title: 'Ingredients'}}/>
          <Stack.Screen name='Unknown' component={Unknown} options={{ title: 'Raw'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

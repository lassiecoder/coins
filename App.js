/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RNBootSplash from 'react-native-bootsplash';

import CoinsList from './src/screens/CoinsList';
import CoinDetails from './src/screens/CoinDetails';
import Dashboard from './src/screens/Dashboard';
import UserDetails from './src/screens/UserDetails';
import News from './src/screens/News';
import NewsDetails from './src/screens/NewsDetails';
import Favorite from './src/screens/Favorite';
import Webview from './src/screens/Webview';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log('Bootsplash has been hidden successfully');
      RNBootSplash.hide();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   }

  //   init().finally(async () => {
  //     await RNBootSplash.hide({ fade: true })
  //     console.log('Bootsplash has been hidden successfully')
  //   })
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="UserDetails">
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CoinsList" component={CoinsList} />
        <Stack.Screen name="CoinDetails" component={CoinDetails} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Webview" component={Webview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import 'react-native-gesture-handler';
// import 'com.facebook.react.bridge.JSIModulePackage';
// import 'com.swmansion.reanimated.ReanimatedJSIModulePackage';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dashboard,
  MapTracking,
  AutomationSetting,
  FavoriteFood,
  LoginPage,
  OrderHistory,
} from './src/screens'
import RegisterPage from './src/screens/RegisterPage'
import LoginDriverPage from './src/screens/LoginDriverPage'
import { Provider } from 'react-redux'
import store from './src/store/index'
import {getUserData} from './src/store/actions/users'
// import { NavigationContainer } from '@react-navigation/native';
// import MapTracking from './src/screens/MapTracking'
// import FavoriteFood from './src/screens/FavoriteFood'
// import LoginPage from './src/screens/LoginPage'
// import OrderHistory from './src/screens/OrderHistory'
// import AutomationSetting from './src/screens/AutomationSetting'
/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => <Icon {...props} name="heart" />;
import axios from 'axios'
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default () => (
  <>
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
        {/* <Drawer.Navigator initialRouteName="LoginPage"> */}
          <Stack.Navigator initialRouteName="LoginPage"  screenOptions={{headerShown: false,  cardStyle: { backgroundColor: 'ghostwhite' }}}>
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="MapTracking" component={MapTracking} />
                <Stack.Screen name="FavoriteFood" component={FavoriteFood} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} />
                {/* <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
                <Stack.Screen name="RegisterPage" component={RegisterPage} />
                <Stack.Screen name="LoginDriverPage" component={LoginDriverPage} />
                <Stack.Screen
                  name="AutomationSetting"
                  component={AutomationSetting}
                />
        {/* </Drawer.Navigator> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});

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
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => (
  <Icon {...props} name='heart'/>
);
import axios from 'axios'
const Stack = createStackNavigator();
function HomeScreen({ navigation }) {
  const [user, setUser] = useState({})
  console.log(user)
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://randomuser.me/api/'
    })
      .then(({data}) => {
        console.log(data.results[0].name)
        setUser(data.results[0].name)
      })
      .catch(console.log)
  }, [])
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category='h1'>
        {user && JSON.stringify(user)}
      </Text>
      <Text style={styles.text} category='s1'>
        Start with editing App.js to configure your App
      </Text>
      <Text style={styles.text} appearance='hint'>
        For example, try changing theme to Dark by using eva.dark
      </Text>
      <Button style={styles.likeButton} onPress={() => navigation.navigate('Details')} accessoryLeft={HeartIcon}>
        LIKE
      </Button>
    </Layout>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
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

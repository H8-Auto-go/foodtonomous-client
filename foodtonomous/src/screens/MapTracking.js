import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  // TopNavigationAction
  Card,
  Drawer
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'
import { NavbarTop } from '../components/NavbarTop';
// import { DrawerNavigator, AppNavigator } from '../components/DrawerBottom';

function MapTracking({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <NavbarTop />
      {/* <DrawerNavigator /> */}
      <Text style={{textAlign: 'center'}}>map here</Text>
      <View style={styles.container}>
        <View ><Text>paket yang dipesen</Text></View>
        <View><Text>total harga</Text></View>
        <View><Text>distance</Text></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    backgroundColor: 'lightgrey',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    borderRadius: 15
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
  },
});


export default MapTracking

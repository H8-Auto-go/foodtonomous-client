import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import {NavbarTop} from '../components/NavbarTop';

const Header = (props) => (
  <View {...props}>
    <Text category='h6'>nama orderan(misal sarapan)</Text>
    <Text category='s1'>jam ordernya</Text>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size='small'>
      ORDER
    </Button>
  </View>
);

function CardDashboard() {
  return (
    <>
     <Card style={styles.card} header={Header} footer={Footer}>
      <Text>
          list makanan dan nama resto {"\n"}
          list makanan dan nama resto {"\n"}
          list makanan dan nama resto{"\n"}
      </Text>
    </Card>
    </>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default CardDashboard

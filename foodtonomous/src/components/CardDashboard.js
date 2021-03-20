import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  Toggle, 
  Card,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import {NavbarTop} from './NavbarTop';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">my daily food automation</Text>
    {/* <Text category="s1">jam ordernya</Text> */}
  </View>
);


function CardDashboard({ food }) {
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <>
      <Card style={styles.card} header={Header}>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{uri: food.picture}}
          />
          <Text>
              {food.name}
          </Text>
          <Text>
              RP.{food.price}
          </Text>
          <Toggle checked={checked} onChange={onCheckedChange}>
            {`Auto: ${checked ? 'on' : 'off'}`}
          </Toggle>
          <Layout style={styles.containerBtn} level='1'>
            <Button style={styles.button} size='tiny' appearance='ghost'>
              X
            </Button>
          </Layout>
        </View>
    </Card>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    padding: 1

  },
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
  button: {
    margin: 2,
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default CardDashboard

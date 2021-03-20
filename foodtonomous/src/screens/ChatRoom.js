import React, {useEffect, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
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
  Input, 
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import {NavbarTop} from '../components/NavbarTop';
import { ScrollView } from 'react-native-gesture-handler';

function ChatRoom() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <NavbarTop />
      <ScrollView style={styles.chatContainer} >
        <Card style={styles.userChat}>
          <Text >
            samlikum
          </Text>
        </Card>
        <Card style={styles.driverChat}>
          <Text>
            KOMSALAM
          </Text>
        </Card>
        <Card style={styles.userChat}>
          <Text>
            DI mana packk?
          </Text>
        </Card>
        <Card style={styles.driverChat}>
          <Text>
            sudah deket nichh
          </Text>
        </Card>
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Chat'
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
          style={{width: windowWidth -80 }}
          />
        <Button size='small'>
          Send
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, 
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBar: {
    // width: 
    // width: useWindowDimensions().width /2
  },  
  chatContainer: {
    flexDirection: 'column-reverse',
    padding: 10
  },
  userChat: {
    alignItems: 'flex-end',
    marginLeft: 100,
    marginBottom: 10
    
  },
  driverChat: {
    alignItems: 'flex-start',
    marginRight: 100,
    marginBottom: 10
  },
});

export default ChatRoom

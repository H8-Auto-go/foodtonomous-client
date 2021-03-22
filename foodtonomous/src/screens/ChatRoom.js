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
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../store/actions/users";
import {getOrder} from '../store/actions/orders'

function ChatRoom() {
  const dispatch = useDispatch()
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const messages = useSelector(state => state.users.messages)
  const user = useSelector(state => state.users.user)
  const order = useSelector(state => state.users)
  useEffect(() => {
    console.log('pati ga ke invok rn bodoh')
    console.log(order)
  }, [order])
  console.log(user)
  console.log(order, '<<<<<dasdasd')
  const [message, setMessage] = useState({
    sender: '',
    text: ''
  })
  const sendMessage = () => {
    dispatch(setMessages(message))
    setMessage({
      sender: '',
      text: ''
    })
  }
  return (
    <View style={styles.container}>
      <NavbarTop />
      <ScrollView style={styles.chatContainer} >
        {messages.length > 0 && messages.map((message,i) => (
          <Card key={i} style={message.sender === 'user'? styles.userChat:styles.driverChat}>
            <Text >
              {message.text}
            </Text>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Chat'
          value={message.text}
          onChangeText={nextValue => setMessage({sender: user.role, text: nextValue })}
          style={{width: windowWidth -80 }}
          />
        <Button size='small' onPress={sendMessage}>
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

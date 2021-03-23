import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image} from "react-native";
import { useSelector } from 'react-redux'
import {
  Button,
  Icon,
  Text,
  Card, Toggle, Layout
} from "@ui-kitten/components";
import {NavbarTop} from '../components/NavbarTop';
import CardDashboard from '../components/CardDashboard';
import { ScrollView } from 'react-native-gesture-handler';
import {notification} from '../store/actions/pushNotification'
import { useDispatch } from 'react-redux'
import { getAutoSchedule } from '../store/actions/automationSchedule'
import { getUserData } from '../store/actions/users'
import {createOrder, getOrder} from "../store/actions/orders";
import socket from '../store/actions/apis/socket'
// import io from 'socket.io-client'
const HeartIcon = (props) => <Icon {...props} name="heart" />;
let num = 1;
function Dashboard({navigation}) {
  const dispatch = useDispatch()
  const { schedule } = useSelector(state => state.schedule)
  const {user} = useSelector(state => state.users)
  const [order, setOrder] = useState({
    id: "",
    driverId: "",
    userId: "",
    foodId: "",
    restaurantId: ""
  })
  const [orderDetail, setOrderDetail] = useState({})
  const [orderId, setOrderId] = useState(-1)
  const [statusOrder, setStatusOrder] = useState(false)
  const [automation, setAutomation] = useState({})
  const [isReceived, setIsReceived] = useState(false)

  useEffect(() => {
    return () => {
      setAutomation({})
      console.log('componen dilepas')
    }
  }, [])

  useEffect(() => {
    if(Object.keys(automation).length > 0) {
      socket.emit('set automation', automation)
    }
  }, [automation])

  useEffect(() => {
    socket.on('give a rating', () => {
      if(user.role === 'user') {
        handleNotification('Your food is arrived!!', 'Happy meal :))')
      }
    })
    socket.on('on going order', order => {
      setOrderDetail(order)
      if(user.role === 'user') {
        handleNotification('Just relax', 'your food is on progress')
      }
    })
    socket.on('incoming order', order => {
      console.log('ini pesanan diterima di driver', new Date().toISOString())
      if(user.role === 'driver') {
        if(!isReceived) {
          setIsReceived(true)
          Alert.alert(
            "Incoming Order",
            `from ${order.User.name} to buy ${order.Food.name}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  setOrderId(order.id)
                  const updatedOrderForm = {
                    status: 'on going restaurant',
                    id: order.id,
                    userId: order.User.id,
                    foodId: order.Food.id,
                    restaurantId: order.Restaurant.id,
                    driverId: user.id
                  }
                  console.log(updatedOrderForm, '^^^^updated form')
                  socket.emit('order confirmation', updatedOrderForm)
                  dispatch(getOrder(order.id))
                } }
            ]
          );
        }else {
          console.log('anjay')
        }
      }
    }, [socket])
  })

  useEffect(() => {
    if(order) {
      if(order.userId && order.foodId && order.restaurantId){
        dispatch(createOrder(order))
      }
    }
  }, [order])

  useEffect(() => {
    if(statusOrder === 'done') {
      socket.emit('order done', {status:'done', id:orderId})
    }
  }, [statusOrder])

  useEffect(() => {
    dispatch(getAutoSchedule())
    dispatch(getUserData())
  }, [dispatch]);

  const handleNotification = (title, message) => {
    notification.configure()
    notification.createChannel(num.toString())
    notification.sendNotification(num.toString(), title, message)
    num++
  }

  if (user && user.role === 'driver') {
    return (
      <>
        <NavbarTop />
        {user && (
          <Card>
            <View style={styles.flexContainer}>
              <View>
                <Text>gopay status</Text>
                <Text>RP.{user.saldo}</Text>
              </View>
              <View>
                <Text style={styles.center}>top up</Text>
              </View>
            </View>
          </Card>
        )}
        <Text>You dont have order yet</Text>
      </>
    )
  } else {
    return (
      <>
        <NavbarTop />
        {user && (
          <Card>
            <View style={styles.flexContainer}>
              <View>
                <Text>gopay status</Text>
                <Text>RP.{user.saldo}</Text>
              </View>
              <View>
                <Text style={styles.center}>top up</Text>
              </View>
            </View>
          </Card>
        )}
          <ScrollView>
            {/*<Button style={styles.button} onPress={handleNotification} appearance='outline' status='primary'>*/}
            {/*  PRIMARY*/}
            {/*</Button>*/}
            <Text style={styles.center}>{"\n"}Food Order Schedule{"\n"}</Text>
            {
              schedule && schedule.map((data) => {
                return <CardDashboard setAutomation={setAutomation} user={user} data={data} key={data.id} />
              })
            }
          </ScrollView>
      </>
    );
  }

}

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
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginLeft: 30,
  },
  CardDashboardContainer: {
    backgroundColor: 'red'

  }
});

export default Dashboard;

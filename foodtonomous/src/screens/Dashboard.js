import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { useSelector } from 'react-redux'
import {
  Button,
  Icon,
  Text,
  Card,
} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import CardDashboard from '../components/CardDashboard';
import { ScrollView } from 'react-native-gesture-handler';
import {notification} from '../store/actions/pushNotification'
import { useDispatch } from 'react-redux'
import { getAutoSchedule } from '../store/actions/automationSchedule'
import { getUserData } from '../store/actions/users'
import {createOrder, getOrder} from "../store/actions/orders";
import socket from '../store/actions/apis/socket'
import SwipeUpDown from 'react-native-swipe-up-down';
import FavoriteFood from './FavoriteFood';
import { useFocusEffect } from '@react-navigation/native';

// import io from 'socket.io-client'
const HeartIcon = (props) => <Icon {...props} name="heart" />;

function MiniItemSwipe(params) {
  return (
    <View style={{justifyContent:'center', alignItems: 'center', marginTop:-8}}>
      <Text>Swipe Up to See Favorite</Text>
    </View>
  )
}

let num = 1;
function Dashboard({navigation}) {
  const dispatch = useDispatch()
  const { schedule } = useSelector(state => state.schedule)
  const {user} = useSelector(state => state.users)
  const [order, setOrder] = useState({
    userId: '',
    foodId: '',
    restaurantId: ''
  })
  const [orderId, setOrderId] = useState(-1)
  const [statusOrder, setStatusOrder] = useState("")

  useEffect(() => {
    socket.on('give a rating', () => {
      if(user.role === 'user') {
        alert('give rating')
      }
    })
    socket.on('on going order', ({user, restaurant, driver, food}) => {
      if(user.role === 'user') {
        alert('pesanan sedang di proses')
        //bikin estimasi
        /*
        location driver => location restaurant = %km
        location restaurant => location user = %km
        + cookEstimation = hasil

        driver => click tombol (order completed)
        //pesanan sudah sampai
        */
        socket.emit('update location driver')
      }
    })
    socket.on('incoming order', order => {
      if(user.role === 'driver') {
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
                socket.emit('order confirmation', updatedOrderForm)
                dispatch(getOrder(order.id))
            } }
          ]
        );
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

  useFocusEffect (
    React.useCallback(() => {
      // const unsubscribe = API.subscribe(dispatch);
        dispatch(getAutoSchedule())
        dispatch(getUserData())

      // return () => unsubscribe();
    }, [dispatch])
  );

  useEffect (() => {
    if(user) {
      if(user.role === 'driver') {
        socket.emit('driver login', user)
      }
    }
  }, [user])

  const handleNotification = () => {
    notification.configure()
    notification.createChannel(num.toString())
    notification.sendNotification(num.toString(), "Testing bos" + num, "moga aja jalan yak")
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
              {/*<View>*/}
              {/*  <Text style={styles.center}>top up</Text>*/}
              {/*</View>*/}
            </View>
          </Card>
        )}
      <View>
        <Text>
          ini halaman driver, nanti driver bisa pickup order
          </Text>
        </View>
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
              {/*<View>*/}
              {/*  <Text style={styles.center}>top up</Text>*/}
              {/*</View>*/}
            </View>
          </Card>
        )}
          <ScrollView style={{marginBottom: 50}}>
            {/* <Button style={styles.button} onPress={handleNotification} appearance='outline' status='primary'>
              PRIMARY
            </Button> */}
            <Text style={styles.heading} category="h5">{"\n"}Food Order Schedule{"\n"}</Text>
            {/* <Text>{schedule}</Text> */}
            {
              schedule && schedule.map(data => {
                return <CardDashboard setStatusOrder={setStatusOrder} setOrder={setOrder} user={user} data={data} key={data.id} />
              })
            }
          </ScrollView>
          <SwipeUpDown		
            itemMini={<MiniItemSwipe />} // Pass props component when collapsed
            itemFull={<FavoriteFood />} // Pass props component when show full
            onShowMini={() => console.log('mini')}
            onShowFull={() => console.log('full')}
            onMoveDown={() => console.log('down')}
            onMoveUp={() => console.log('up')}
            disablePressToShow={false} // Press item mini to show full
            style={{ backgroundColor: '#F3D5B4' }} // style for swipe
            animation="easeInEaseOut" 
            swipeHeight={60}
          />
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
  },
  heading: {
    textAlign: 'center',
    backgroundColor: '#F4A460',
    borderRadius: 10,
    margin: 10,
  },
  CardDashboardContainer: {
    backgroundColor: 'red'

  }
});

export default Dashboard;

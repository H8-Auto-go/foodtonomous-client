import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image, Dimensions, yellowBox } from 'react-native';
import { useSelector } from 'react-redux'
import {GOOGLE_API} from "@env"
import {
  Button,
  Icon,
  Text,
  Card,
  Layout,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Avatar,
  ViewPager 
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SpinnerLoading from '../components/SpinnerLoading';
import { logout } from '../store/actions/users'
import {setTime, setDistance, setAddress } from '../store/actions/destination'
import store from '../store'
import NavbarDriver from '../components/NavbarDriver'

// import io from 'socket.io-client'

function MiniItemSwipe(params) {
  return (
    <View style={{justifyContent:'center', alignItems: 'center', marginTop:-20}}>
      <Text
      category='h6'
      style={{fontWeight: 'bold'}}
      >Swipe Up to See Food list</Text>
    </View>
  )
}

let num = 1;
function Dashboard({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.disableYellowBox = true;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
  const [automation, setAutomation] = useState({})
  const [orderDetail, setOrderDetail] = useState({})
  const [isHandlingFood, setHandlingFood] = useState(false)
  const [isReceived, setIsReceived] = useState(false)
  const address = useSelector(state => state.destination.address)

  useEffect(() => {
    socket.on('on going order', order => {
      let user = store.getState().users.user
      let destination = store.getState().destination
      setOrderDetail(order) 
      if(user.role === 'user') {
        if(!isReceived) {
          setIsReceived(true)
          handleNotification('Food is Comming!!', 
          `Estimated total time: ${destination.time + 5} mins, Estimated total distance: ${destination.distance} km
          your address is : ${destination.address}`)
        } else {
          console.log('harusnya sekali coy dari ongoing order')
        }
      }
    })
  }, [])

  useEffect(() => {
    const getDirection = async (startLoc, desLoc, addLoc) => {
      let time = 0
      let distance = 0
      let locations = []
      if (desLoc) {
        try {
          const resp = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_API}`)
          const respJson = await resp.json()
          let timeCount = respJson.routes[0].legs[0].duration.text
          let distanceCount = respJson.routes[0].legs[0].distance.text
          let restaurantLocation = respJson.routes[0].legs[0].end_address
          let inputTime = ''
          for (let a = 0; a < timeCount.length; a++) {
            if (timeCount[a] !== ' '){
              inputTime += timeCount[a]
            } else if (timeCount[a] == ' '){
              break;
            }
          }
          let inputDistance = ''
          for (let a = 0; a < distanceCount.length; a++) {
            if (distanceCount[a] !== ' '){
              inputDistance += distanceCount[a]
            } else if (distanceCount[a] == ' '){
              break;
            }
          }
          time +=Number(inputTime)
          distance += Number(inputDistance)
          locations.push(restaurantLocation)
          const resp1 = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${desLoc}&destination=${addLoc}&key=${GOOGLE_API}`)
          const respJson1 = await resp1.json()
          let timeCount1 = respJson1.routes[0].legs[0].duration.text
          let distanceCount1 = respJson1.routes[0].legs[0].distance.text
          let customerAddress = respJson1.routes[0].legs[0].end_address

          let inputTime2 = ''
          for (let a = 0; a < timeCount1.length; a++) {
            if (timeCount1[a] !== ' '){
              inputTime2 += timeCount1[a]
            } else if (timeCount1[a] == ' '){
              break;
            }
          }
          let inputDistance2 = ''
          for (let a = 0; a < distanceCount1.length; a++) {
            if (distanceCount1[a] !== ' '){
              inputDistance2 += distanceCount1[a]
            } else if (distanceCount1[a] == ' '){
              break;
            }
          }
          time +=Number(inputTime2)
          distance += Number(inputDistance2)
          locations.push(customerAddress)
          dispatch(setTime(time))
          dispatch(setDistance(distance))
          dispatch(setAddress(locations))
        } catch (error) {
          console.log('error cuy');
          console.log(error.message);
        }
      }
    }
    
    const mergeCoords = (payload1, payload2, payload3) => {
        if (payload1.latitude === 'undefined') {
          const concatStart = `-6.94103414525,107.655786634`
        }
        payload3 = JSON.parse(payload3)
        const concatStart = `${payload1.latitude},${payload1.longitude}`
      const concatAdditional = `${payload3.latitude}, ${payload3.longitude}`
      const concatEnd = `${payload2.latitude},${payload2.longitude}`
      getDirection(concatStart, concatEnd, concatAdditional)
    }

    socket.on('incoming order', order => {
      let user = store.getState().users.user
      let restaurantPosition = JSON.parse(order.Restaurant.location)
      let customerPosition = order.User.location
      mergeCoords(user.location, restaurantPosition, customerPosition)
      if(user.role === 'driver') {
        console.log('ini user driver', user);
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
              setHandlingFood(true)
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
    })
  }, [socket])


  useEffect(() => {
    socket.on('giveARating', () => {
      let user = store.getState().users.user
      setIsReceived(false)
      dispatch(getUserData())
      if(user.role === 'user') {
        if(!isReceived) {
          handleNotification('Your food has arrived!', `Enjoy your meal :)`)
        }
      }
    })
  }, [socket])

  useEffect(() => {
    if(order) {
      if(order.userId && order.foodId && order.restaurantId){
        dispatch(createOrder(order))
      }
    }
  }, [order])

  useEffect(() => {
    let destination = store.getState().destination
    if(statusOrder) {
      socket.emit('order done', {status:'done', id:orderId, distance: destination.distance})
    }
  }, [statusOrder])

  useFocusEffect (
    React.useCallback(() => {
        dispatch(getAutoSchedule())
    }, [dispatch])
  );

  const handleNotification = (title, message) => {
    notification.configure()
    notification.createChannel(num.toString())
    notification.sendNotification(num.toString(), title, message)
    num++
  }

  const endOrder = () => {
    setStatusOrder(!statusOrder)
    setHandlingFood(false)
  }


  if (user && user.role === 'driver') {
    return (
      <>
      <NavbarDriver />
        {user && (
          <Card>
            <View style={styles.flexContainer}>
              <View>
                <Text
                category='h6'
                style={{fontWeight: 'bold'}}
                >Balance:</Text>
                <Text>Rp. {user.saldo}</Text>
              </View>
              <View>
                <Button
                status='success'
                appearance='outline'>
                  Withdraw
                </Button>
              </View>
            </View>
          </Card>
        )}
          <View style={styles.driverWrapper}> 
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text
                category='h4'
                >Ongoing Order</Text>
              </View>
            {/* { address.length !== 0 && isHandlingFood ?  */}
            <Card style={styles.cardDriver} status='success'>
              <View style={{marginLeft: 30,textAlign: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../assets/logo2.png')}
                  style={{width: windowWidth -130, height: windowHeight / 2.7, borderRadius: 11, }}
                />
              </View>
                
              <Text
              category='h6'
              style={{fontWeight: 'bold'}}
              >Order Details:</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={{fontWeight: 'bold'}}> Restaurant's Address: </Text>
                <Text style={{color:'#1B3D6C', marginBottom: 10}}>{address[0]} </Text>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={{fontWeight: 'bold'}}> Customer's Address: </Text>
                <Text style={{color:'#1B3D6C'}}> {address[1]} </Text>
              </View>
              <Button
                onPress={endOrder}
                status='warning'
                color="#841584"
                accessibilityLabel="Learn more about this purple button">
                Finish Delivery
              </Button>
            </Card> 
            {/* jangan diapus!! */}
            {/* : 
              <Card style={{alignItems: 'center'}} status='info'>
                <Text
                category='h6'
                >you have no ongoing order</Text>
              </Card>
            } */}
          </ScrollView>
        </View>
      </>
    )
  } else {
    return (
      <>
        <NavbarTop />

      <ViewPager
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <Layout
            style={styles.tab}
            level='2'>
            {user && (
              <Card style={{elevation: 1}}>
                <View style={styles.flexContainer}>
                  <View>
                    <Text
                    category='h6'
                    style={{fontWeight: 'bold'}}
                    >Balance: </Text>
                    <Text>Rp. {user.saldo}</Text>
                  </View>
                  <View>
                    <Button
                      status='success'
                      appearance='outline'>
                      Top Up
                    </Button>
                  </View>
                </View>
              </Card>
            )}
              <ScrollView style={{marginBottom: 50}}>
                <Text style={styles.heading} category="h5">{"\n"}Food Order Schedule{"\n"}</Text>
                {
                  schedule ? 
                  schedule.map(data => {
                    return <CardDashboard setAutomation={setAutomation} user={user} data={data} key={data.id} />
                  })
                  :
                  <SpinnerLoading/>
                }
                
              </ScrollView>
          </Layout>
          <Layout
            style={styles.tab}
            level='2'>
            <FavoriteFood />
          </Layout>
          {/* jaga2 kalo dipake ehehhehehe */}
          {/* <Layout
            style={styles.tab}
            level='2'>
            <Text category='h5'>TRANSACTIONS</Text>
          </Layout> */}
        </ViewPager>
        
          {/* <SwipeUpDown		
            itemMini={<MiniItemSwipe />} // Pass props component when collapsed
            itemFull={<FavoriteFood />} // Pass props component when show full
            onShowMini={() => console.log('mini')}
            onShowFull={() => console.log('full')}
            onMoveDown={() => console.log('down')}
            onMoveUp={() => console.log('up')}
            disablePressToShow={true} // Press item mini to show full
            style={{ backgroundColor: '#cbf3f0',elevation: 2 }} // style for swipe
            animation="easeInEaseOut" 
            swipeHeight={65}
          /> */}
      </>
    );
  }
  
}

const styles = StyleSheet.create({
  tab: {
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  CardDashboardContainer: {
    backgroundColor: 'red'

  },
  layoutContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ghostwhite'
  },
  driverWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 10,
    borderRadius: 10,

  },
  cardDriver: {
    // margin: 40,
    // borderRadius: 10,
    // alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
    width: 150,
    borderRadius: 0,
    height: 100,
    marginTop: -25
  },
});

export default Dashboard;

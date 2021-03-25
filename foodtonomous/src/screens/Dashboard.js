import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image, Dimensions, yellowBox } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
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
import {setTime, setDistance, setAddress, setResCoords } from '../store/actions/destination'
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
  // const {user} = useSelector(state => state.users)
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
  const time = useSelector(state => state.destination.time)
  const distance = useSelector(state => state.destination.time)
  const resCoords = useSelector(state => state.destination.resCoords)
  const [mapMargin, setMapMargin] = useState(1)
  const user = useSelector(state => state.users.user)
  const markerPosition = useSelector(state => state.destination.resCoords)
  const [foodPriceInDriver, setFoodPriceInDriver] = useState(0)
  // useEffect(() => {
  //   if(Object.keys(automation).length > 0) {
  //     socket.emit('set automation', automation)
  //   }
  // }, [automation])

  useEffect(() => {
    dispatch(getUserData())
  }, [])
  useEffect(() => {
    socket.on('on going order', order => {
      let user = store.getState().users.user
      let destination = store.getState().destination
      // console.log(destination, 'dari on going orider');
      setOrderDetail(order) 
      if(user.role === 'user') {
        if(!isReceived) {
          setIsReceived(true)
          handleNotification('Food is Comming!', 
          `Estimated total time: ${destination.time + 5} mins, Estimated total distance: ${destination.distance} km`)
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
          // console.log('dari respJson satu',respJson)
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
          // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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
          let latitude = ''
      let longitude =''
      let flag = false
      for (let i = 0; i < desLoc.length; i++){
        if (desLoc[i] !== ',' && flag === false){
          latitude += desLoc[i]
        }
        if (desLoc[i] === ','){
          flag = true
        }
        if(desLoc[i] !== ',' && flag === true) {
          longitude +=desLoc[i]
        }
      }
      let latitude1 = ''
      let longitude1 =''
      let flag1 = false
      for (let j = 0; j < addLoc.length; j++){
        if (addLoc[j] !== ',' && flag1 === false){
          latitude1 += addLoc[j]
        }
        if (addLoc[j] === ','){
          flag1 = true
        }
        if(addLoc[j] !== ',' && flag1 === true) {
          longitude1 +=addLoc[j]
        }
      }
      let resLoc =[{title: 'Restaurant',
                    locations: {latitude, longitude}}, 
                    {title: 'Customer',
                    locations: {latitude: latitude1, longitude: longitude1}}]
      console.log('dari itung jarak dashboard', resLoc);
          time +=Number(inputTime2)
          distance += Number(inputDistance2)
          locations.push(customerAddress)
          dispatch(setTime(time))
          dispatch(setDistance(distance))
          dispatch(setAddress(locations))
          dispatch(setResCoords(resLoc))
        } catch (error) {
          console.log('error cuy');
          console.log(error.message);
        }
      }
    }
    
    const mergeCoords = (payload1, payload2, payload3) => {
        // if (payload1.latitude === 'undefined') {
        //   const concatStart = `-6.94103414525,107.655786634`
        // }
        payload3 = JSON.parse(payload3)
        const concatStart = `${payload1.latitude},${payload1.longitude}`
      // console.log(payload3.latitude, 'payload 3 calon concat add');
      // console.log(payload3.longitude, 'paylad 3 calon longitude');
      const concatAdditional = `${payload3.latitude}, ${payload3.longitude}`
      const concatEnd = `${payload2.latitude},${payload2.longitude}`
      // console.log('dari mergeCoords');
      // console.log('concatstart mergecoord 1', concatStart );
      // console.log('concatEnd mergecoord 1',concatEnd);
      // console.log('concatAdditional mergecoord 1',concatAdditional);
      getDirection(concatStart, concatEnd, concatAdditional)
    }


    // socket.on('on going order', ({user, restaurant, driver, food}) => {
    //   if(user.role === 'user') {
    //     handleNotification('Food is Comming!!', 
    //   `Estimated total time: mins, Estimated total distance:  km`)
    //     // alert('Food is Comming!!')
    //     // alert('pesanan sedang di proses')
    //     // socket.emit('update location driver')
    //   }
    // })

    socket.on('incoming order', order => {
      let user = store.getState().users.user
      console.log('dari incoming order', order);
      // console.log('ini dari incoming order')
      // console.log('ini dari incoming order user ',user);
      let restaurantPosition = JSON.parse(order.Restaurant.location)
      let customerPosition = order.User.location
      // console.log(user.location, 'user dari incoming order');
      // console.log(customerPosition, 'customerPosition dari incoming order');
      mergeCoords(user.location, restaurantPosition, customerPosition)
      if(!user || user.role === 'driver' || user.role !== 'user') {
        console.log('ini user driver', user);
        Alert.alert(
          "Incoming Order",
          `from ${order.User.name} to buy ${order.Food.name}, Total price(delivery fee excluded):  ${formattedPrice(order.Food.price*order.quantity)}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
              setFoodPriceInDriver(order.Food.price*order.quantity)
              // let user = store.getState().users.user
              // let restaurantPosition = JSON.parse(order.Restaurant.location)
              // let customerPosition = JSON.parse(order.User.location)
              // console.log(user.role, 'dari incoming order');
              // mergeCoords(user.location, restaurantPosition, customerPosition)
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

  // console.log('INI ADALAH USER DETAIL, MAU NGECEK DRIVER ADA ATAU ENGGA')
  // console.log(user)

  useEffect(() => {
    socket.once('giveARating', () => {
      let user = store.getState().users.user
      // console.log(user);
      // console.log('tolong give rating');
      // console.log('ini refetch saldo anjay asek uhuy')
      dispatch(getUserData())
      // console.log('DISINI DI GIVE RATING, TAPI MASIH GENERAL', user)
      // console.log('user dari giveRating', user);
      if(user.role === 'user') {
        // console.log(user.role);
        if(!isReceived) {
          num++
          console.log(num, 'counterrr')
          handleNotification('Your food has arrived!', `Happy meal :)`)
          setIsReceived(true)
        } else {
          console.log('harusnya terus terusan, ini food arrived')
        }
      }
    })
  }, [])

  useEffect(() => {
    if(order) {
      if(order.userId && order.foodId && order.restaurantId){
        dispatch(createOrder(order))
      }
    }
  }, [order])

  useEffect(() => {
    let destination = store.getState().destination
    if(statusOrder === true) {
      // console.log('masuk sini setelah end order');
      // console.log('order selesai', orderId, destination.distance)
      console.log('INI ORDER DONE DI KLIK USER')
      console.log({status:'done', id:orderId, distance: destination.distance})
      socket.emit('order done', {status:'done', id:orderId, distance: destination.distance})
    }
  }, [statusOrder])

  useFocusEffect (
    React.useCallback(() => {;
        dispatch(getAutoSchedule())
        // dispatch(getUserData())
    }, [dispatch])
  );

  // useEffect (() => {
  //   if(user) {
  //     if(user.role === 'driver') {
  //       socket.emit('driver login', user)
  //     }
  //   }
  // }, [user])

  // const handleNotification = () => {
  //   notification.configure()
  //   notification.createChannel(num.toString())
  //   notification.sendNotification(num.toString(), "Testing bos" + num, "moga aja jalan yak")
  //   num++
  // }

  // useEffect(() => {
  //   socket.on('refetch saldo', () => {
  //     console.log('ini refetch saldo anjay asek uhuy')
  //     dispatch(getUserData())
  //   })
  // }, [socket])
  const PlusIcon = (props) => (
    <Icon name='plus-outline' {...props} />
  );
  

  const handleNotification = (title, message) => {
    // console.log(title, 'title dari handle');
    // console.log(message, 'message dari handle');
    notification.configure()
    notification.createChannel(num.toString())
    notification.sendNotification(num.toString(), title, message)
    num++
  }

  const endOrder = () => {
    // let destination = store.getState().destination
    // console.log(destination.address)
    // console.log(destination.address)
    setStatusOrder(!statusOrder)
    setHandlingFood(false)
  }
  function formattedPrice(price) {
    return 'Rp. ' + price.toString()
      .split('')
      .reverse()
      .map((number, i) => i % 3 === 0 && i !== 0 ? number + '.' : number)
      .reverse()
      .join('')
  }
  const setMargin = () => {
    setMapMargin(0)
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
                {
                  user.saldo ? <Text>{formattedPrice(user.saldo)}</Text> : undefined
                }
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
        {/* { address.length !== 0 && isHandlingFood ? 
        
      } */}
      {
        address.length !== 0 && isHandlingFood ? 
        <ScrollView>
      <View>
      <View style={styles.container1}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...styles.map, marginBottom: mapMargin }}
        showsUserLocation
        followsUserLocation
        onMapReady={setMargin}
        region={
        {latitude: user.location.latitude,
        longitude: user.location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,}
        }>
           {
              markerPosition.length !== 0 ? 
              markerPosition.map((data, index) => {
                console.log(typeof data.locatidons, '<<<< menurut gue ini objek')
                // console.log('MULAI SERIUS DISINI WOI AHAHAHAH======================================================')
                // console.log('dari menurut gua',data.locations);
                // console.log('dari menurut gua',data.locations.latitude);
                // console.log('dari menurut gua',data.locations.longitude);
                // console.log("HUHUHUHUHUHUHUHHHUHUHUHUHUHUUHUHUHUHUHUHUUH")
                // const {latitude, longitude} = data.locations
                // const parsedLocation = JSON.parse(data.locations)
                const [latitude, longitude] = [Number(data.locations.latitude), Number(data.locations.longitude)];
                // console.log(latitude, longitude, '===========')
                // console.log(typeof latitude, typeof longitude, '>>>>>>>> typeof')
              return <Marker 
                coordinate={{
                  latitude, 
                  longitude}} 
                  title={data.title} />
              }) : undefined
            }
        </MapView>
      </View>
        <Card style={styles.cardDriver} status='success'>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold'}}> Total Food Price: </Text>
            <Text style={{color:'#1B3D6C', marginBottom: 10}}>{formattedPrice(foodPriceInDriver)}</Text>
          </View>
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
      </View>
      </ScrollView> : 
      <Card style={{alignItems: 'center'}} status='info'>
        <Text
        category='h6'
        >you have no ongoing order</Text>
      </Card>
      }
      {/* <ScrollView>
      <View>
      <View style={styles.container1}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...styles.map, marginBottom: mapMargin }}
        showsUserLocation
        followsUserLocation
        onMapReady={setMargin}
        region={
        {latitude: user.location.latitude ? user.location.latitude : -6.2688,
        longitude: user.location.longitude ? user.location.longitude : 106.8438,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,}
        }>
           {
              markerPosition.length !== 0 ? 
              markerPosition.map((data, index) => {
              return <Marker coordinate={{latitude: Number(JSON.parse(data.locations.latitude)), longitude: Number(JSON.parse(data.locations.latitude))}} title={data.title} />
              }) : undefined
            }
        </MapView>
      </View>
        <Card style={styles.cardDriver} status='info'>
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
      </View>
      </ScrollView> */}
          {/* <View style={styles.driverWrapper}>  */}
            {/* <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text
                category='h4'
                >Ongoing Order</Text>
              </View>
            { address.length !== 0 && isHandlingFood ? 
            <Card style={styles.cardDriver} status='info'>
                
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
            </Card> : 
              //kalau ga ada order render yang ini
              <Card style={{alignItems: 'center'}} status='info'>
                <Text
                category='h6'
                >you have no ongoing order</Text>
              </Card>
            }
          </ScrollView> */}
        {/* </View> */}
      </>
    )
  } else if (user && user.role === 'user') {
    return (
      <>
        <NavbarTop />
          <ViewPager
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              <Layout
                style={styles.tab}
                level='2'>
                  {/* <View> */}
                {user && (
                  <Card style={{elevation: 1}}>
                    <View style={styles.flexContainer}>
                      <View>
                        <Text
                        category='h6'
                        style={{fontWeight: 'bold'}}
                        >Balance: </Text>
                        {
                            user.saldo ? <Text>{formattedPrice(user.saldo)}</Text> : undefined
                          }
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
                    <Text style={styles.heading} category="h5">{"\n"}Food Order Schedule</Text>
                    <Text style={{textAlign: 'center'}} >swipe left to see Food List {"\n"}</Text>
                    {
                      schedule ? 
                      schedule.map(data => {
                        return <CardDashboard setAutomation={setAutomation} user={user} data={data} key={data.id} />
                      })
                      :
                      <SpinnerLoading/>
                    }
                    
                  </ScrollView>
                  {/* </View> */}
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
            
      </>
    );
  } else {
    return (
      <SpinnerLoading/>
    )
  }
  
}

const styles = StyleSheet.create({
  tab: {
    height: '100%',
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
    fontWeight: 'bold'
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
  map: {
    flex: 1
  },
  container1: {
    height: Dimensions.get('window').height * 0.42,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    // alignItems: 'center',
    // margin: 10,
    // borderRadius: 10,
  }
});

export default Dashboard;

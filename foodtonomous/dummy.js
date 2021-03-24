// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View, Alert, Image, Dimensions, yellowBox } from 'react-native';
// import { useSelector } from 'react-redux'
// import {GOOGLE_API} from "@env"
// import {
//   Button,
//   Icon,
//   Text,
//   Card,
//   Layout,
//   TopNavigation,
//   TopNavigationAction,
//   OverflowMenu,
//   MenuItem
// } from '@ui-kitten/components';
// import {NavbarTop} from '../components/NavbarTop';
// import CardDashboard from '../components/CardDashboard';
// import { ScrollView } from 'react-native-gesture-handler';
// import {notification} from '../store/actions/pushNotification'
// import { useDispatch } from 'react-redux'
// import { getAutoSchedule } from '../store/actions/automationSchedule'
// import { getUserData } from '../store/actions/users'
// import {createOrder, getOrder} from "../store/actions/orders";
// import socket from '../store/actions/apis/socket'
// import SwipeUpDown from 'react-native-swipe-up-down';
// import FavoriteFood from './FavoriteFood';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import SpinnerLoading from '../components/SpinnerLoading';
// import { logout } from '../store/actions/users'
// import {setTime, setDistance, setAddress } from '../store/actions/destination'
// import store from '../store'

// // import io from 'socket.io-client'
// const HeartIcon = (props) => <Icon {...props} name="heart" />;

// function MiniItemSwipe(params) {
//   return (
//     <View style={{justifyContent:'center', alignItems: 'center', marginTop:-23, fontWeight: 'bold'}}>
//       <Text>Swipe Up to See Foods list</Text>
//     </View>
//   )
// }

// let num = 1;
// function Dashboard({navigation}) {
//   console.disableYellowBox = true;
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const dispatch = useDispatch()
//   const { schedule } = useSelector(state => state.schedule)
//   const {user} = useSelector(state => state.users)
//   const [order, setOrder] = useState({
//     userId: '',
//     foodId: '',
//     restaurantId: ''
//   })
//   const [orderId, setOrderId] = useState(-1)
//   const [statusOrder, setStatusOrder] = useState("")
//   const [automation, setAutomation] = useState({})
//   const [orderDetail, setOrderDetail] = useState({})
//   const [isHandlingFood, setHandlingFood] = useState(false)
//   const [isReceived, setIsReceived] = useState(false)
//   const address = useSelector(state => state.destination.address)

//   // useEffect(() => {
//   //   if(Object.keys(automation).length > 0) {
//   //     socket.emit('set automation', automation)
//   //   }
//   // }, [automation])

//   useEffect(() => {
//     socket.on('on going order', order => {
//       let user = store.getState().users.user
//       let destination = store.getState().destination
//       // console.log(destination, 'dari on going orider');
//       setOrderDetail(order) 
//       if(user.role === 'user') {
//         if(!isReceived) {
//           setIsReceived(true)
//           handleNotification('Food is Comming!!', 
//           `Estimated total time: ${destination.time + 5} mins, Estimated total distance: ${destination.distance} km
//           your address is : ${destination.address}`)
//         } else {
//           console.log('harusnya sekali coy dari ongoing order')
//         }
//       }
//     })
//   }, [])

//   useEffect(() => {
//     const getDirection = async (startLoc, desLoc, addLoc) => {
//       let time = 0
//       let distance = 0
//       let locations = []
//       if (desLoc) {
//         try {
//           const resp = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_API}`)
//           const respJson = await resp.json()
//           // console.log('dari respJson satu',respJson)
//           let timeCount = respJson.routes[0].legs[0].duration.text
//           let distanceCount = respJson.routes[0].legs[0].distance.text
//           let restaurantLocation = respJson.routes[0].legs[0].end_address
//           let inputTime = ''
//           for (let a = 0; a < timeCount.length; a++) {
//             if (timeCount[a] !== ' '){
//               inputTime += timeCount[a]
//             } else if (timeCount[a] == ' '){
//               break;
//             }
//           }
//           let inputDistance = ''
//           for (let a = 0; a < distanceCount.length; a++) {
//             if (distanceCount[a] !== ' '){
//               inputDistance += distanceCount[a]
//             } else if (distanceCount[a] == ' '){
//               break;
//             }
//           }
//           time +=Number(inputTime)
//           distance += Number(inputDistance)
//           locations.push(restaurantLocation)
//           // console.log(time, 'ini time dari try 1');
//           // console.log(distance, 'ini distance dari try 1');

//           // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//           const resp1 = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${desLoc}&destination=${addLoc}&key=${GOOGLE_API}`)
//           const respJson1 = await resp1.json()
//           // console.log('dari respJson satu',respJson1)
//           let timeCount1 = respJson1.routes[0].legs[0].duration.text
//           let distanceCount1 = respJson1.routes[0].legs[0].distance.text
//           let customerAddress = respJson1.routes[0].legs[0].end_address

//           let inputTime2 = ''
//           for (let a = 0; a < timeCount1.length; a++) {
//             if (timeCount1[a] !== ' '){
//               inputTime2 += timeCount1[a]
//             } else if (timeCount1[a] == ' '){
//               break;
//             }
//           }
//           let inputDistance2 = ''
//           for (let a = 0; a < distanceCount1.length; a++) {
//             if (distanceCount1[a] !== ' '){
//               inputDistance2 += distanceCount1[a]
//             } else if (distanceCount1[a] == ' '){
//               break;
//             }
//           }
//           time +=Number(inputTime2)
//           distance += Number(inputDistance2)
//           locations.push(customerAddress)
//           // console.log(time, 'ini time dari try 2');
//           // console.log(distance, 'ini distance dari try 2');
//           // console.log(locations)
//           dispatch(setTime(time))
//           dispatch(setDistance(distance))
//           dispatch(setAddress(locations))
//         } catch (error) {
//           console.log('error cuy');
//           console.log(error.message);
//         }
//       }
//     }
    
//     const mergeCoords = (payload1, payload2, payload3) => {
//         if (payload1.latitude === 'undefined') {
//           const concatStart = `-6.94103414525,107.655786634`
//         }
//         payload3 = JSON.parse(payload3)
//         const concatStart = `${payload1.latitude},${payload1.longitude}`
//       // console.log(payload3.latitude, 'payload 3 calon concat add');
//       // console.log(payload3.longitude, 'paylad 3 calon longitude');
//       const concatAdditional = `${payload3.latitude}, ${payload3.longitude}`
//       const concatEnd = `${payload2.latitude},${payload2.longitude}`
//       // console.log('dari mergeCoords');
//       // console.log('concatstart mergecoord 1', concatStart );
//       // console.log('concatEnd mergecoord 1',concatEnd);
//       // console.log('concatAdditional mergecoord 1',concatAdditional);
//       getDirection(concatStart, concatEnd, concatAdditional)
//     }

//     socket.on('give a rating', () => {
//       let user = store.getState().users.user
//       console.log('tolong give rating');
//       setIsReceived(false)
//       if(user.role === 'user') {
//         // console.log(user.role);
//         if(!isReceived) {
//           handleNotification('Your food has arrived!!', 'Happy meal :))')
//         } else {
//           console.log('harusnya cuma sekali, ini food arrived')
//         }
//       }
//     })
//     // socket.on('on going order', ({user, restaurant, driver, food}) => {
//     //   if(user.role === 'user') {
//     //     handleNotification('Food is Comming!!', 
//     //   `Estimated total time: mins, Estimated total distance:  km`)
//     //     // alert('Food is Comming!!')
//     //     // alert('pesanan sedang di proses')
//     //     // socket.emit('update location driver')
//     //   }
//     // })

//     socket.on('incoming order', order => {
//       // console.log('ini dari incoming order')
//       let user = store.getState().users.user
//       let restaurantPosition = JSON.parse(order.Restaurant.location)
//       let customerPosition = order.User.location
//       // console.log(user.location, 'user dari incoming order');
//       // console.log(customerPosition, 'customerPosition dari incoming order');
//       mergeCoords(user.location, restaurantPosition, customerPosition)
//       if(user.role === 'driver') {
//         Alert.alert(
//           "Incoming Order",
//           `from ${order.User.name} to buy ${order.Food.name}`,
//           [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel"
//             },
//             { text: "OK", onPress: () => {
//               // let user = store.getState().users.user
//               // let restaurantPosition = JSON.parse(order.Restaurant.location)
//               // let customerPosition = JSON.parse(order.User.location)
//               // console.log(user.role, 'dari incoming order');
//               // mergeCoords(user.location, restaurantPosition, customerPosition)
//               setHandlingFood(true)
//               setOrderId(order.id)
//                 const updatedOrderForm = {
//                   status: 'on going restaurant',
//                   id: order.id,
//                   userId: order.User.id,
//                   foodId: order.Food.id,
//                   restaurantId: order.Restaurant.id,
//                   driverId: user.id
//                 }
//                 socket.emit('order confirmation', updatedOrderForm)
//                 dispatch(getOrder(order.id))
//             } }
//           ]
//         );
//       }
//     }, [socket])
//   }, [])



//   useEffect(() => {
//     if(order) {
//       if(order.userId && order.foodId && order.restaurantId){
//         dispatch(createOrder(order))
//       }
//     }
//   }, [order])

//   useEffect(() => {
//     let destination = store.getState().destination
//     if(statusOrder === true) {
//       console.log('order selesai', orderId, destination.distance)
//       socket.emit('order done', {status:'done', id:orderId, distance: destination.distance})
//     }
//   }, [statusOrder])

//   useFocusEffect (
//     React.useCallback(() => {
//       // const unsubscribe = API.subscribe(dispatch);
//         dispatch(getAutoSchedule())
//         // dispatch(getUserData())

//       // return () => unsubscribe();
//     }, [dispatch])
//   );

//   // useEffect (() => {
//   //   if(user) {
//   //     if(user.role === 'driver') {
//   //       socket.emit('driver login', user)
//   //     }
//   //   }
//   // }, [user])

//   // const handleNotification = () => {
//   //   notification.configure()
//   //   notification.createChannel(num.toString())
//   //   notification.sendNotification(num.toString(), "Testing bos" + num, "moga aja jalan yak")
//   //   num++
//   // }

//   const PlusIcon = (props) => (
//     <Icon name='plus-outline' {...props} />
//   );
  

//   //navbar untuk driver
//   // const navigation = useNavigation(); 
//   const renderMenuAction = () => (
//     <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
//   );
//   const [menuVisible, setMenuVisible] = React.useState(false);

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const handleLogout = () => {
//     // navigation.navigate('LoginPage')
//     //untuk hit ke actions
//     dispatch(logout(navigation))
//   }

//   const renderRightActions = () => (
//     <React.Fragment>
//       <OverflowMenu
//         style={{backgroundColor: '#ffbf69'}}
//         anchor={renderMenuAction}
//         visible={menuVisible}
//         onBackdropPress={toggleMenu}>
//         <MenuItem 
//           onPress={() => handleLogout()}
//           accessoryLeft={LogoutIcon} title='Logout'/>
//       </OverflowMenu>
//     </React.Fragment>
//   );

//   const LogoutIcon = (props) => (
//     <Icon {...props} name='log-out'/>
//   );
//   const MenuIcon = (props) => (
//   <Icon name='menu' {...props} />
//   );

//   const handleNotification = (title, message) => {
//     // console.log(title, 'title dari handle');
//     // console.log(message, 'message dari handle');
//     notification.configure()
//     notification.createChannel(num.toString())
//     notification.sendNotification(num.toString(), title, message)
//     num++
//   }

//   const endOrder = () => {
//     let destination = store.getState().destination
//     // console.log(destination.address)
//     // console.log(destination.address)
//     setStatusOrder(!statusOrder)
//     setHandlingFood(false)
//   }

//   if (user && user.role === 'driver') {
//     return (
//       <>
//         {/* <NavbarTop /> */}
//         <Layout  level='4'>
//           <TopNavigation
//             alignment='center'
//             title='HelloFood'
//             subtitle='HelloFood Driver'
//             accessoryLeft={renderRightActions}
//           />
//         </Layout>
//         {user && (
//           <Card>
//             <View style={styles.flexContainer}>
//               <View>
//                 <Text>Saldo status:</Text>
//                 <Text>Rp. {user.saldo}</Text>
//               </View>
//               <View>
//                 <Text style={styles.center}>top up</Text>
//               </View>
//               {/*<View>*/}
//               {/*  <Text style={styles.center}>top up</Text>*/}
//               {/*</View>*/}
//             </View>
//           </Card>
//         )}
//           <View style={styles.driverWrapper}> 
//             <ScrollView>
//               <View style={{alignItems: 'center'}}>
//                 <Text
//                 category='h4'
//                 >Ongoing Order</Text>
//               </View>
//             { address.length !== 0 && isHandlingFood ? 
//             <Card style={styles.cardDriver} status='info'>
//                 <Image
//                   source={require('../assets/logo2.png')}
//                   style={{width: windowWidth -130, height: windowHeight / 3.1, borderRadius: 11}}
//                 />
//               <Text
//               category='h6'
//               style={{fontWeight: 'bold'}}
//               >Order Details:</Text>
//               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
//                 <Text style={{fontWeight: 'bold'}}> Restaurant's {'\n'} Address: </Text>
//                 <Text style={{color:'#1B3D6C', marginBottom: 10}}>{address[0]} </Text>
//               </View>
//               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
//                 <Text style={{fontWeight: 'bold'}}> Customer's Address: </Text>
//                 <Text style={{color:'#1B3D6C'}}> {address[1]} </Text>
//               </View>
//               <Button
//                 onPress={endOrder}
//                 starus='warning'
//                 color="#841584"
//                 accessibilityLabel="Learn more about this purple button">
//                 End Order
//               </Button>
//             </Card> : 
//               //kalau ga ada order render yang ini
//               <Card style={{alignItems: 'center'}} status='info'>
//                 <Text
//                 category='h6'
//                 >you have no ongoing order</Text>
//               </Card>
//             }
            
//           </ScrollView>
//         </View>
        
//       </>
//     )
//   } else {
//     return (
//       <>
//         <NavbarTop />
//         {user && (
//           <Card style={{elevation: 1}}>
//             <View style={styles.flexContainer}>
//               <View>
//                 <Text>Saldo status: </Text>
//                 <Text>Rp. {user.saldo}</Text>
//               </View>
//               <View>
//                 <Text style={styles.center}>top up</Text>
//               </View>
//             </View>
//           </Card>
//         )}
//           <ScrollView style={{marginBottom: 50}}>
//             {/* <Button style={styles.button} onPress={handleNotification} appearance='outline' status='primary'>
//               PRIMARY
//             </Button> */}
//             <Text style={styles.heading} category="h5">{"\n"}Food Order Schedule{"\n"}</Text>
//             {/* <Text>{schedule}</Text> */}
//             <Layout style={styles.layoutContainer} level='1'>
//               <Button appearance='outline' status='warning'
//               accessoryLeft={PlusIcon}
//               onPress={()=> navigation.navigate('AutomationSetting')}
//               > Add New
//               </Button>
//             </Layout>
//             {
//               schedule ? 
//               schedule.map(data => {
//                 return <CardDashboard setAutomation={setAutomation} user={user} data={data} key={data.id} />
//               })
//               :
//               <SpinnerLoading/>
//             }
            
//           </ScrollView>
//           <SwipeUpDown		
//             itemMini={<MiniItemSwipe />} // Pass props component when collapsed
//             itemFull={<FavoriteFood />} // Pass props component when show full
//             onShowMini={() => console.log('mini')}
//             onShowFull={() => console.log('full')}
//             onMoveDown={() => console.log('down')}
//             onMoveUp={() => console.log('up')}
//             disablePressToShow={false} // Press item mini to show full
//             style={{ backgroundColor: '#cbf3f0',elevation: 2 }} // style for swipe
//             animation="easeInEaseOut" 
//             swipeHeight={65}
//           />
//       </>
//     );
//   }
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     textAlign: 'center',
//   },
//   flexContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     elevation: 2
//   },
//   center: {
//     textAlign: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     textAlign: 'center',
//   },
//   CardDashboardContainer: {
//     backgroundColor: 'red'

//   },
//   layoutContainer:{
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'ghostwhite'
//   },
//   driverWrapper: {
//     flex: 1,
//     justifyContent: "flex-start",
//     margin: 10,
//     borderRadius: 10,

//   },
//   cardDriver: {
//     // margin: 40,
//     // borderRadius: 10,
//     // alignItems: 'center',
//   }
// });

// export default Dashboard;

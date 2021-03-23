import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image, Dimensions} from 'react-native';
import { useSelector } from 'react-redux'
import {
  Button,
  Icon,
  Text,
  Card,
  Layout,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem
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

  const PlusIcon = (props) => (
    <Icon name='plus-outline' {...props} />
  );
  

  //navbar untuk driver
  // const navigation = useNavigation(); 
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    // navigation.navigate('LoginPage')
    //untuk hit ke actions
    dispatch(logout(navigation))
  }

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        style={{backgroundColor: '#ffbf69'}}
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem 
          onPress={() => handleLogout()}
          accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out'/>
  );
  const MenuIcon = (props) => (
  <Icon name='menu' {...props} />
  );

  if (user && user.role === 'driver') {
    return (
      <>
        {/* <NavbarTop /> */}
        <Layout  level='4'>
          <TopNavigation
            alignment='center'
            title='HelloFood'
            subtitle='HelloFood Driver'
            accessoryLeft={renderRightActions}
            // style={{backgroundColor: '#ff9f1c'}}
          />
        </Layout>
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
          <View style={styles.driverWrapper}> 
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text
                category='h4'
                >Ongoing Order</Text>
              </View>
            {
              //kalau ga ada order render yang ini
              <Card style={styles.cardDriver} status='info'>
                <Text
                category='h6'
                >you have no ongoing order</Text>
              </Card>
            }
            <Card style={styles.cardDriver} status='info'>
                <Image
                  source={require('../assets/logo2.png')}
                  style={{width: windowWidth -130, height: windowHeight / 3.1, borderRadius: 11}}
                />
              <Text>keterangan orderannya</Text>
              <Text>cust adress </Text>
              <Button status="warning">finish delivery</Button>
            </Card>
          </ScrollView>
        </View>
        
      </>
    )
  } else {
    return (
      <>
        <NavbarTop />
        {user && (
          <Card style={{elevation: 1}}>
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
          <ScrollView style={{marginBottom: 50}}>
            {/* <Button style={styles.button} onPress={handleNotification} appearance='outline' status='primary'>
              PRIMARY
            </Button> */}
            <Text style={styles.heading} category="h5">{"\n"}Food Order Schedule{"\n"}</Text>
            {/* <Text>{schedule}</Text> */}
            <Layout style={styles.layoutContainer} level='1'>
              <Button appearance='outline' status='warning'
              accessoryLeft={PlusIcon}
              onPress={()=> navigation.navigate('AutomationSetting')}
              > Add New
              </Button>
            </Layout>
            {
              schedule ? 
              schedule.map(data => {
                return <CardDashboard setStatusOrder={setStatusOrder} setOrder={setOrder} user={user} data={data} key={data.id} />
              })
              :
              <SpinnerLoading/>
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
            style={{ backgroundColor: '#cbf3f0',elevation: 2 }} // style for swipe
            animation="easeInEaseOut" 
            swipeHeight={50}
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
    // backgroundColor: '#F4A460',
    // borderRadius: 10,
    // margin: 10,
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
    margin: 40,
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Dashboard;

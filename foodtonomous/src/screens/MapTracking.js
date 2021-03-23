import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux'
import Polyline from '@mapbox/polyline'
import { getOrderData, setUserPosition } from '../store/actions/userPositionAction'
import {GOOGLE_API} from "@env"
import { Text } from '@ui-kitten/components';
import { NavbarTop } from '../components/NavbarTop';
import socket from '../store/actions/apis/socket'
import Spinner from '../components/SpinnerLoading'

function MapTracking({ navigation }) {
  const dispatch = useDispatch()
  const userPosition = useSelector(state => state.userPosition.userPosition)
  const markerPosition = useSelector(state => state.userPosition.markerPosition)
  const restaurantPosition = useSelector(state => state.userPosition.restaurantPosition)
  const [mapMargin, setMapMargin] = useState(1)
  const [userPosition1, setUSerPosition1] = useState({})
  const [marker, setMarker] = useState({})
  const [coordination, setCoordination] = useState([])
  const [time, setTime] = useState('')
  const [distance, setDistance] = useState('')
  const [adress, setAdress] = useState('')
  const [ttime, setTtime] = useState(0)

  useEffect (() => {
    dispatch(getOrderData())
  }, [])
  
  useEffect(() => {
    requstLocationPermission()
  }, [])

  useEffect(() => {
    mergeCoords()
  }, [marker, userPosition1])

    
  // useEffect(() => {
  //   const driverData = {}
  //   setTimeout(() => {
  //     setTime(ttime+3)
      
  //     console.log('anjir', ttime)
  //   }, 3000)
  // }, [socket, ttime])
    
    // console.log('dari mapTracking',userPosition);
    // if (markerPosition.location){
      // console.log('dari mapTracking',markerPosition.location);
      // const [marker, setMarker] = useState(
      //     {latitude: markerPosition.location.latitude,
      //     longitude: markerPosition.location.longitude})
      //     const [restaurant, setRestaurant] = useState({
      //       latitude: restaurantPosition.location.latitutde,
      //       longitude: restaurantPosition.location.longitude
      //     })
    // }
    
    // console.log('dari mapTracking',restaurantPosition.location);
    // const [marker, setMarker] = useState(
    //   {latitude: markerPosition.location.latitude,
    //   longitude: markerPosition.location.longitude})
    //   const [restaurant, setRestaurant] = useState({
    //     latitude: restaurantPosition.location.latitutde,
    //     longitude: restaurantPosition.location.longitude
    //   })
  
    const requstLocationPermission = async () => {
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  
      if(response == 'granted') {
        console.log(response);
        locateCurrentPosition()
      }
  
    }
  
    function locateCurrentPosition () {
      try {
        Geolocation.getCurrentPosition(
          position => {
            let coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }
            console.log(coordinates);
            dispatch(setUserPosition(coordinates))
            setUSerPosition1(coordinates)
          }, error => {
          }, { enableHighAccuracy: true }
        )
      } catch(err) {
        console.log(err)
      }
    }
  
    const setMargin = () => {
      setMapMargin(0)
    }
  
    const getDirection = async (startLoc, desLoc) => {
      if (desLoc) {
        try {
          const resp = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_API}`)
          const respJson = await resp.json()
          setDistance(respJson.routes[0].legs[0].distance.text)
          setTime(respJson.routes[0].legs[0].duration.text)
          setAdress(respJson.routes[0].legs[0].end_address)
          const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          const coords = points.map(point => {
            return {
              latitude: point[0],
              longitude: point[1]
            }
          })
          setCoordination(coords)
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  
    const mergeCoords = () => {
      if (markerPosition.location){
        const hasStartAndEnd = userPosition1.latitude != null && markerPosition.location.latitude != null
        if (hasStartAndEnd) {
          const concatStart = `${userPosition1.latitude},${userPosition1.longitude}`
          const concatEnd = `${markerPosition.location.latitude},${markerPosition.location.longitude}`
          getDirection(concatStart, concatEnd)
        }
      }
    }

    const onUserChange = (payload) => {
      setTtime(ttime+3)
      socket.emit('update location driver', {ttime})
      setTimeout(()=>{requstLocationPermission()}, 50000);
    }


    if (markerPosition.location){
      let orderPosition = [
        restaurantPosition, markerPosition
      ]
      if (marker.latitude !== markerPosition.location.latitude) {
        setMarker(markerPosition.location)
      } 
      return (
        <SafeAreaView>
          <NavbarTop />
        <View style={styles.container1}>
          {
            userPosition.latitude ? <MapView
            provider={PROVIDER_GOOGLE} 
            style={{ ...styles.map, marginBottom: mapMargin }}
            showsUserLocation
            followsUserLocation
            onMapReady={setMargin}
            region={ userPosition }
            // onUserLocationChange={e => onUserChange(e.nativeEvent)}
            //  onPress={e => onPressHandler(e.nativeEvent)}
          >
            {
          (markerPosition.location.latitude) ? 
          orderPosition.map((data, index) => {
            return <Marker
            coordinate={data.location}
            title={data.name}
            key = {index}
            />
          })
          : undefined 
          }
          {
            (coordination.length > 0) ? 
            <MapView.Polyline 
            strokeWidth={4}
            strokeColor='red'
            coordinates={coordination} 
            /> : undefined
          }
          </MapView> : undefined
          }
          
        </View>
        <View
            style={styles.container2}>
              <Text style={{fontWeight: 'bold'}}>Estimated Time: {time}</Text>
              <Text style={{fontWeight: 'bold'}}>Estimated DIstance: {distance}</Text>
              {/* untuk driver tambahin customer address ini */}
              <Text style={{fontWeight: 'bold'}}>Customer Address: {adress}</Text>
            </View>
        </SafeAreaView>
      )
    } else {
      return (
        <Spinner></Spinner>
      )
    }
  }
  

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    borderRadius: 15
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
  },
  container1: {
    height: Dimensions.get('window').height * 0.70,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  map: {
    flex: 1
  },
  container2: {
    width: Dimensions.get('window').width,
    paddingTop: 10,

    alignItems: 'flex-start',
    height: Dimensions.get('window').height * 0.25,
    backgroundColor: 'white',
    justifyContent: 'flex-start'
  }
});


export default MapTracking

import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Polyline from '@mapbox/polyline'
import {GOOGLE_API} from "@env"
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  // TopNavigationAction
  Card,
  Drawer
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'
import { NavbarTop } from '../components/NavbarTop';
// import { DrawerNavigator, AppNavigator } from '../components/DrawerBottom';

function MapTracking({ navigation }) {
  // console.log(navigation, '========================');
  // navigation.pop('MapTracking')

  const [userLocation, setUserLocation] = useState({})
  const [mapMargin, setMapMargin] = useState(1)
  const [marker, setMarker] = useState({})
  const [coordination, setCoordination] = useState([])
  const [time, setTime] = useState('')
  const [distance, setDistance] = useState('')
  const [adress, setAdress] = useState('')

  useEffect(() => {
    requstLocationPermission()
  }, [])

  useEffect(() => {
    mergeCoords()
  }, [marker])

  const requstLocationPermission = async () => {
    let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    if(response == 'granted') {
      console.log(response);
      locateCurrentPosition()
    }

  }

  function locateCurrentPosition () {
    Geolocation.getCurrentPosition(
      position => {
        let coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }
        setUserLocation(coordinates)
      }
    )
  }

  const setMargin = () => {
    setMapMargin(0)
  }

  const getDirection = async (startLoc, desLoc) => {
    if (desLoc) {
      try {
        const resp = await fetch (`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_API}`)
        const respJson = await resp.json()
        console.log(respJson.routes[0].legs[0].distance.text);
        console.log(respJson.routes[0].legs[0].duration.text);
        console.log(respJson.routes[0].legs[0].end_address);
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
        console.log('error dari get direction');
      }
    }
  }

  const onPressHandler = (payload) => {
    console.log(payload);
    setMarker([])
    setCoordination([])
    let secondTime = false
    let coordinates = {
      latitude: payload.coordinate.latitude,
      longitude: payload.coordinate.longitude
    }
    setMarker(coordinates)
  }

  const mergeCoords = () => {
    const hasStartAndEnd = userLocation.latitude != null && marker.latitude != null

    if (hasStartAndEnd) {
      const concatStart = `${userLocation.latitude},${userLocation.longitude}`
      // coba debug disni
      const concatEnd = `${marker.latitude},${marker.longitude}`
      getDirection(concatStart, concatEnd)
    }
  }

  return (
    <SafeAreaView>
      <NavbarTop />
    <View style={styles.container1}>
      <MapView
       provider={PROVIDER_GOOGLE} 
       style={{ ...styles.map, marginBottom: mapMargin }}
       showsUserLocation
       //  showsTraffic
        showsCompass
        // followsUserLocation kecuali untuk drive
        onMapReady={setMargin}
        region={userLocation.latitude ? userLocation : {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={e => onPressHandler(e.nativeEvent)}
      >
         {
      (coordination.length > 0) ? <Marker
      coordinate={marker}
      title='foodtonomous courier'
     /> : undefined 
     }
     {
       (coordination.length > 0) ? 
       <MapView.Polyline 
       strokeWidth={4}
       strokeColor='red'
       coordinates={coordination} 
       /> : undefined
     }
      </MapView>
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
    height: Dimensions.get('window').height * 0.75,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  map: {
    flex: 1
  },
  container2: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    // alignSelf: 'center',
    alignItems: 'flex-start',
    height: Dimensions.get('window').height * 0.25,
    backgroundColor: 'white',
    justifyContent: 'flex-start'
  }
});


export default MapTracking

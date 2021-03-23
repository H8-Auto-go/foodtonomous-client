import { Button } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text,Toggle,Icon } from '@ui-kitten/components';
import { loginDriver } from '../store/actions/users'
import {useSelector} from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

function LoginDriverPage() {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("amos@xavier.com");
  const [password, setPassword] = useState("1234");
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [location, setLocation] = useState({})

  useEffect(() => {
    requstLocationPermission()
  }, [])
  const requstLocationPermission = async () => {
    let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    if(response === 'granted') {
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
          }
          setLocation(coordinates)
        }, error => {
        }, { enableHighAccuracy: true }
      )
    } catch(err) {
      console.log(err)
    }
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const handleLoginDriver = () => {
    const form = { email, password, location }
    dispatch(loginDriver(form, navigation))
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>logo here</Text>
      </View>
      <View style={styles.formContainer}>
        <Text>Login Driver</Text>
        <Input
          placeholder="your email"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
          style={{width: windowWidth / 1.6}}
        />
        <Input
          label='Password'
          placeholder="your password"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
          style={{width: windowWidth / 1.6}}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderIcon}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={{width: windowWidth / 3.5}}
            onPress={handleLoginDriver}
            status="success">
            Login
          </Button>
          <Button style={{width: windowWidth / 3.5}} onPress={()=> navigation.navigate('LoginPage')}appearance='ghost'>
          I'm a user
        </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'red',
    padding: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  formContainer: {
    display: 'flex',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginDriverPage;

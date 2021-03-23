
import { Button } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text,Toggle, Icon } from '@ui-kitten/components';
import { login } from '../store/actions/users'
import {useSelector} from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, requestLocationAccuracy} from 'react-native-permissions';

function LoginPage() {
  const navigation = useNavigation();
  const [activeChecked, setActiveChecked] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const [location, setLocation] = useState({})

  useEffect(() => {
    requstLocationPermission()
  }, [])
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
          }
          console.log(coordinates);
          setLocation(coordinates)
        }, error => {
        }, { enableHighAccuracy: true }
      )
    } catch(err) {
      console.log(err)
    }
  }

  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
    // if (activeChecked) {
      navigation.navigate('LoginDriverPage')
    // }
  };
  const dispatch = useDispatch();
  const [email, setEmail] = useState("angga@xavier.com");
  const [password, setPassword] = useState("1234");
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );


  const validateForm = ({email, password}) => {
    const errorList = []
    if(!email) { errorList.push("email required") }
    // if(!password) { errorList.push('password required') }
    return { status: errorList.length === 0, errorList }
  }
  // const isAuth = useSelector(state => state.isAuthenticate)

  const handleLogin = async () => {
    // navigation.navigate('Home');

    // untuk hit ke axios
    const form = {
      email, password, location
    }
    
    const validate = validateForm(form)
    if(validate.status) {
      // console.log('anjay')
      dispatch(login(form, navigation))
      // if(isAuth) {
      //   setEmail('')
      //   setPassword('')
      // } else {
      //   alert('email or password is wrong')
      // }
    } else {
      alert('please insert email or password')
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };
  return (
    <View style={styles.container}>

      <View >
        <Image
          source={require('../assets/logo2.png')}
          style={{width: windowWidth -130, height: windowHeight / 3.1, borderRadius: 11}}
        />
      </View>
      <View style={styles.formContainer}>
        <Text>Login User</Text>
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
            onPress={handleLogin}
            status="success">
            Login
          </Button>
          <Button style={{width: windowWidth / 3.5}} onPress={handleRegister}>
            Register
          </Button>
        </View>
        <Button style={styles.button} onPress={()=> navigation.navigate('LoginDriverPage')}appearance='ghost'>
          I'm a driver
        </Button>
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

export default LoginPage;

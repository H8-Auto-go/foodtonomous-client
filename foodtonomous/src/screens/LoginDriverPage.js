import { Button } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions,Image } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text,Toggle,Icon } from '@ui-kitten/components';
import { loginDriver } from '../store/actions/users'
import {useSelector} from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, requestLocationAccuracy} from 'react-native-permissions';
// import socket from '../store/actions/apis/socket'
function LoginDriverPage() {
  const [activeChecked, setActiveChecked] = React.useState(true);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const onActiveCheckedChange = (isChecked) => {
    // if (!activeChecked) {
      navigation.navigate('LoginPage')
    // }
    setActiveChecked(isChecked);
  };
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
    // !password) { errorList.push('password required') }
    return { status: errorList.length === 0, errorList }
  }

  const isAuth = useSelector(state => state.isAuthenticate)

  const handleLoginDriver = () => {
    // navigation.navigate('Home');
    const form = {
      email, password, location
    }
    console.log(form);
    const validate = validateForm(form)
    if(validate.status) {
      dispatch(loginDriver(form, navigation))
      // if(isAuth) {
      //   setEmail('')
      //   setPassword('')
      // } else {
      //   alert('email or password is wrong')
      // }
    } else {
      alert('please insert email or password')
    }
    //untuk hit ke axios
    // let user = {
    //   email,
    //   password,
    // }
    // dispatch(loginDriver(driver, navigation))
    // setEmail('')
    // setPassword('')
  };

  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };
  return (
    <View style={styles.container}>
      {/* <Toggle
        style={styles.toggle}
        checked={activeChecked}
        status='warning'
        onChange={onActiveCheckedChange}>
        {activeChecked ? 'driver' : "user"}
      </Toggle> */}
      <View>
      <Image
          source={require('../assets/logo2.png')}
          style={{width: windowWidth -130, height: windowHeight / 3.1, borderRadius: 11}}
        />
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
            style={{width: windowWidth / 1.7}}
            onPress={handleLoginDriver}
            status="success">
            Login
          </Button>
          <Button style={{width: windowWidth / 2}} onPress={()=> navigation.navigate('LoginPage')}appearance='ghost'>
          I'm a user
        </Button>
          {/* <Button style={{width: windowWidth / 3.5}} onPress={handleRegister}>
            Register
          </Button> */}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // width: 50,
    // height: 50,
    borderRadius: 15,
  },
});

export default LoginDriverPage;

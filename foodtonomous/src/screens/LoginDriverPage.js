
import { Button } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text,Toggle } from '@ui-kitten/components';
import { loginDriver } from '../store/actions/users'
import {useSelector} from 'react-redux'
// import socket from '../store/actions/apis/socket'
function LoginDriverPage() {
  const [activeChecked, setActiveChecked] = React.useState(true);

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
      email, password
    }
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
          placeholder="your password"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
          style={{width: windowWidth / 1.6}}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginDriverPage;

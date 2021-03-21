
import { Button } from '@ui-kitten/components'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text,Toggle } from '@ui-kitten/components';
import { loginDriver } from '../store/actions/users'

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const handleLogin = () => {
    navigation.navigate('Home');

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

    console.log('ke halaman register');
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
            onPress={handleLogin}
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

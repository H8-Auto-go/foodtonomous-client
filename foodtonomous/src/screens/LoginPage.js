
import { Button } from '@ui-kitten/components'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'
import { Input,Text } from '@ui-kitten/components';
import { login } from '../store/actions/users'

function LoginPage() {
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
    // dispatch(login(user, navigation))
    // setEmail('')
    // setPassword('')
  };

  const handleRegister = () => {
    navigation.navigate('RegisterPage');

    console.log('ke halaman register');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>logo here</Text>
      </View>
      <View style={styles.formContainer}>
        <Text>Login</Text>
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
          <Button style={{width: windowWidth / 3.5}} onPress={handleRegister}>
            Register
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

export default LoginPage;

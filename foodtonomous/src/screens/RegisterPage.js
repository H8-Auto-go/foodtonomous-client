import {Button} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View,Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {Input, Text} from '@ui-kitten/components';
import {register} from '../store/actions/users';
import {Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function RegisterPage() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('user')
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const validateForm = (payload) => {
    const errorList = []
    if(!payload.email) { errorList.push("email required") }
    if(!payload.name) { errorList.push("name required") }
    if(!payload.password) {errorList.push("name required")}
    return { status: errorList.length === 0, errorList }
  }

  const handleRegister = () => {
    const form = {
      name,
      email,
      password,
      role
    }

    const validate = validateForm(form)
    if (validate.status) {
      dispatch(register(form, navigation))
    }
    
  };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/logo2.png')}
          style={{width: windowWidth -130, height: windowHeight / 2.7, borderRadius: 11}}
        />
      </View>
      <View style={styles.formContainer}>
        <Text>Register</Text>
        <Input
          placeholder="your name"
          value={name}
          onChangeText={(nextValue) => setName(nextValue)}
          style={{width: windowWidth / 1.6}}
        />
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
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) =>
            setRole(itemValue)
          }>
          <Picker.Item label="I am user" value="user" />
          <Picker.Item label="I am a driver" value="driver" />
        </Picker>
        <View style={styles.buttonContainer}>
          <Button style={{width: windowWidth / 1.6}} onPress={handleRegister}>
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
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    borderRadius: 15,
  },
});

export default RegisterPage;

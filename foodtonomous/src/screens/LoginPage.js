import { Button } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Text } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Input } from '@ui-kitten/components';

function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <View style={styles.container}>
      <View>
        <Text>login page here</Text>
        <Input
          placeholder='your email'
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          placeholder='your password'
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
        />
      <Button onPress={() => navigation.navigate('Home')}>Login</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage

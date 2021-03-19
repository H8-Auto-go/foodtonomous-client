import { Button } from '@ui-kitten/components'
import React from 'react'
import { Text } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

function LoginPage() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'red'}}>
        <Text>login page here</Text>
      </View>
      <Button onPress={() => navigation.navigate('Home')}>google login</Button>
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

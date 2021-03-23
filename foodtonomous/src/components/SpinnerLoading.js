import React from 'react'
import {
  Layout,
  Spinner
} from '@ui-kitten/components';
import {StyleSheet, View } from 'react-native';


function SpinnerLoading() {
  return (
    <View  style={styles.containerSpinner}>
      <Layout level='1'>
        <Spinner status='warning'/>
      </Layout>
    </View>
  )
}

const styles = StyleSheet.create({
  containerSpinner: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SpinnerLoading

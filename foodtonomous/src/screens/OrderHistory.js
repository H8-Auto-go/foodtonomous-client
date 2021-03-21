import React, { useEffect } from 'react'
import {Card, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import {NavbarTop} from '../components/NavbarTop';
import { getHistoryFoods } from '../store/actions/historyFoods'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'

function OrderHistory() {
  const dispatch = useDispatch();
  const { historyFoods } = useSelector(state => state.historyFoods)
  console.log(historyFoods);
  useEffect(() => {
    dispatch(getHistoryFoods())
    return () => {
      console.log('cleaned up');
    }
  }, [])
  return (
    <View style={styles.container}>
      <NavbarTop />
      <Text style={{textAlign: 'center'}}>{"\n"}Order History {"\n"}</Text>
      <Card>
        <View style={styles.flexCont}>
          <View>
            <Text> IMG here </Text>
          </View>
          <Text> | </Text>
          <View>
            <Text>
              deskripsi makanan dan nama restorannya
            </Text>
            <Text>
              tanggal order
            </Text>
          </View>
        </View>
      </Card>
      <Card>
        <View style={styles.flexCont}>
          <View>
            <Text> IMG here </Text>
          </View>
          <Text> | </Text>
          <View>
            <Text>
              deskripsi makanan dan nama restorannya
            </Text>
            <Text>
              tanggal order
            </Text>
          </View>
        </View>
      </Card>
      <Card>
        <View style={styles.flexCont}>
          <View>
            <Text> IMG here </Text>
          </View>
          <Text> | </Text>
          <View>
            <Text>
              deskripsi makanan dan nama restorannya
            </Text>
            <Text>
              tanggal order
            </Text>
          </View>
        </View>
      </Card>
      <Card>
        <View style={styles.flexCont}>
          <View>
            <Text> IMG here </Text>
          </View>
          <Text> | </Text>
          <View>
            <Text>
              deskripsi makanan dan nama restorannya
            </Text>
            <Text>
              tanggal order
            </Text>
          </View>
        </View>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 0,
  },
  flexCont: {
    display: 'flex',
    flexDirection: 'row',
  }
});

export default OrderHistory

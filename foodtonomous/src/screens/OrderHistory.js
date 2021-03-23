import React, { useEffect } from 'react'
import {Card, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import {NavbarTop} from '../components/NavbarTop';
import { getHistoryFoods } from '../store/actions/historyFoods'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import FavouriteCard from '../components/FavouriteCard';

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
      <Text 
      category="h4"
      style={{textAlign: 'center'}}>{"\n"}Order History {"\n"}</Text>
      {
        historyFoods.length === 0 ?
        <View
        style={styles.headingContainer}>
          <Text
          category='h6'
          >History is empty</Text>
          <Text>add automation to see your history</Text>
        </View>
        : 
        <FavouriteCard></FavouriteCard>

      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  flexCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingContainer: {
    alignItems:'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10
  }
});

export default OrderHistory

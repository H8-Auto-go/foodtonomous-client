import React, { useEffect } from 'react'
import {Card, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import {NavbarTop} from '../components/NavbarTop';
import { getHistoryFoods } from '../store/actions/historyFoods'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import HistoryCard from '../components/HistoryCard';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

function OrderHistory() {
  const dispatch = useDispatch();
  const { historyFoods } = useSelector(state => state.historyFoods)
  // console.log(historyFoods);
  // useFocusEffect
  useFocusEffect (
    React.useCallback(() => {;
      dispatch(getHistoryFoods())
        // dispatch(getUserData())
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      <NavbarTop />
      <ScrollView>
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
            historyFoods.map(history => {
              // console.log(history, '>>>>>> data history')
              return <HistoryCard data={history} key={history.id}/>
            })
          }
      </ScrollView>
      
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

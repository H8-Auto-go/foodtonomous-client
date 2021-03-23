import React, { useEffect, useState } from 'react'
import {Card, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import {getFavouriteFoods} from '../store/actions/favouriteFoods'
import FavouriteCard from '../components/FavouriteCard'
import { ScrollView } from 'react-native-gesture-handler';

function FavoriteFood() {
  const favouriteFoods = useSelector(state => state.favoriteFoods.favoriteFoods)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFavouriteFoods())
  }, []);

  return (
    <View style={styles.container}>
      <Text 
      category='h4'
      style={{textAlign: 'center'}}>{"\n"}Favorites Food{"\n"}</Text>
      <ScrollView>
        {
          favouriteFoods &&
          favouriteFoods ? 
          favouriteFoods.map(data => {
            return <FavouriteCard data={data} key={data.id}/>
          })
          : null
        }
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    elevation: 2
  },
  flexCont: {
    display: 'flex',
    flexDirection: 'row',
  }
});


export default FavoriteFood

import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Card, Text} from '@ui-kitten/components';

function FavouriteCard ({data}) {
    // console.log('dari component ',data);
    return(
        <Card>
        <View style={styles.flexCont}>
          <View>
            <Image 
            style={styles.tinyLogo}
            source={{uri: data.food.picture}} />
          </View>
          <Text> | </Text>
          <View>
            <Text>
              {data.food.name}
            </Text>
          </View>
          <Text> | </Text>
          <View>
              <Text>
                  {data.food.price}
              </Text>
          </View>
        </View>
      </Card>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flexCont: {
      display: 'flex',
      flexDirection: 'row',
    },
    tinyLogo: {
        width: 50,
        height: 50,
      },
  });

export default FavouriteCard
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Card, Text} from '@ui-kitten/components';

function FavouriteCard ({data}) {
    // console.log('dari component ',data);
    return(
        <Card style={{elevation: 2, marginBottom: 5}}>
        <View style={styles.flexCont}>
          <View>
            <Image 
            style={styles.tinyLogo}
            source={{uri: data.food.picture}} />
          </View>
          <View style={{marginLeft: 10}}>
            <View>
              <Text>
                {data.food.name}
              </Text>
            </View>
            <View>
                <Text>
                    RP.{data.food.price}
                </Text>
            </View>
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
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Card, Text, Icon} from '@ui-kitten/components';

function HistoryCard ({data}) {
  const dateRaw = new Date(data.updatedAt).toLocaleString('id-ID')
  const [dayString, month, day, time, year] = dateRaw.split(" ")
  const [hour, minute, seconds] = time.split(":")
  const dateParsed = `${hour}:${minute}, ${dayString} ${month} ${day} ${year}`
    const Header = (props, name) => (
      <View {...props}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='home-outline' fill='black' width={24} height={24} />
          <Text
          category='h6'
          style={{fontWeight: 'bold'}}
          > {data.Restaurant.name}
          </Text>
        </View>
      </View>
    );
    
    return(
        <Card style={styles.card} header={Header}>
        <View style={styles.flexCont}>
          <View>
            <Image 
            style={styles.tinyLogo}
            source={{uri: data.Food.picture}} />
          </View>
          <View style={{marginLeft: 10}}>
            <View>
              <Text
              category='h6'
              >
                {data.Food.name}
              </Text>
            </View>
            <View>
                <Text>
                    RP.{data.Food.price}
                </Text>
            </View>
            <View>
                <Text>
                    {dateParsed}
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
  card:{
    margin: 7,
    elevation: 2,
    borderRadius: 15,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: 'ghostwhite'
  },
});
export default HistoryCard
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Card, Text, Icon, Divider} from '@ui-kitten/components';

function HistoryCard ({data}) {
  const dateRaw = new Date(data.updatedAt).toLocaleString('id-ID')
  const [dayString, month, day, time, year] = dateRaw.split(" ")
  const [hour, minute, seconds] = time.split(":")
  const dateParsed = `${hour}:${minute}, ${dayString} ${month} ${day}`
  function formattedPrice(price) {
    return price.toString()
      .split('')
      .reverse()
      .map((number, i) => i % 3 === 0 && i !== 0 ? number + '.' : number)
      .reverse()
      .join('')
  }
    return(
      <>
        <Card style={styles.card}>
          <View style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                style={styles.tinyLogo}
                source={{uri: data.Food.picture}}
              />
              <View style={{marginLeft: 15, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View >
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='credit-card-outline' fill='black' width={24} height={24} />
                    <Text category='h6' style={{fontWeight: 'bold'}}>
                      {' '}{data.Food.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='home-outline' fill='black' width={24} height={24} />
                    <Text style={{fontWeight: 'bold'}}>
                      {' '}{data.Restaurant.name}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight:'bold'}}>
                      {' '}Rp.
                    </Text>
                    <Text>
                      {formattedPrice(data.Food.price)}
                    </Text>
                  </View>
                  
                  <Divider/>
                    <View >
                      <Text>{' '}{data.quantity} items || Rp.{formattedPrice(data.totalPrice)}</Text>
                    </View>
                </View>
              </View>
              <View style={{position: 'absolute', right: 0, top: 0}}>
                    <Text>
                    {' '}{dateParsed}
                    </Text>
                  </View>
            </View>
          </View>
        </Card>
      </>
    )
}

// style={{position: 'absolute', right: 0, top: 0}}
//style={{justifyContent: 'space-between', height: '75%'}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: -15
  },
  flexCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  card:{
    margin: 7,
    elevation: 2,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: 'white'
  },
  tinyLogo: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginLeft: -8,
    
  },
  footerContainer: {
    width: 250,
    display:'flex', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default HistoryCard
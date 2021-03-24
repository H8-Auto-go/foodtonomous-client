import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Card, Text, Icon} from '@ui-kitten/components';

function FavouriteCard ({data}) {
    return(
      <>
        <Card style={styles.card}>
          <View style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                style={styles.tinyLogo}
                source={{uri: data.food.picture}}
              />
              <View style={{marginLeft: 15, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{justifyContent: 'space-around', height: '75%'}}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='credit-card-outline' fill='black' width={24} height={24} />
                    <Text category='h6' style={{fontWeight: 'bold'}}>
                      {' '}{data.food.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='home-outline' fill='black' width={24} height={24} />
                    <Text style={{fontWeight: 'bold'}}>
                      {' '}{data.restaurant.name}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight:'bold'}}>
                      {' '}Rp.
                    </Text>
                    <Text>
                      {data.food.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </>
    )
}

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
    width: 110,
    height: 110,
    borderRadius: 8,
    marginLeft: -8,
    
  },
  footerContainer: {
    width: 210,
    display:'flex', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default FavouriteCard
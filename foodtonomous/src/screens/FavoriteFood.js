import React, { useEffect, useState } from 'react'
import {Card, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import {NavbarTop} from '../components/NavbarTop';
import axios from 'axios';

function FavoriteFood() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://randomuser.me/api/',
    })
      .then(({data}) => {
        console.log(data.results[0].name, '+++++++++++++++++++++++++++++++++++++++++++++++');
        setUser(data.results[0].name);
      })
      .catch(console.log);
  }, []);
  return (
    <View style={styles.container}>
      <NavbarTop />
      <Text style={{textAlign: 'center'}}>{"\n"}Favorite Food{"\n"}</Text>
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


export default FavoriteFood

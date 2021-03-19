import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  // TopNavigationAction
  Card,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import {NavbarTop} from '../components/NavbarTop';
import CardDashboard from '../components/CardDashboard';
import { ScrollView } from 'react-native-gesture-handler';
import {notification} from '../store/actions/pushNotification'
const HeartIcon = (props) => <Icon {...props} name="heart" />;
let num = 1;
function Dashboard({navigation}) {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://randomuser.me/api/',
    })
      .then(({data}) => {
        console.log(data.results[0].name, '========================');
        setUser(data.results[0].name);
      })
      .catch(console.log);
  }, []);
  const handleNotification = () => {
    notification.configure()
    notification.createChannel(num.toString())
    notification.sendNotification(num.toString(), "Testing bos" + num, "moga aja jalan yak")
    num++
  }
  return (
    <>
      <NavbarTop />
      {/* <ScrollView> */}
        <Card>
          <View style={styles.flexContainer}>
            <View>
              <Text>gopay status</Text>
              <Text>Rp.10.000</Text>
            </View>
            <View>
              <Text style={styles.center}>top up</Text>
            </View>
            <View>
              <Text style={styles.center}>top up</Text>
            </View>
          </View>
        </Card>
        <ScrollView>
          <Button style={styles.button} onPress={handleNotification} appearance='outline' status='primary'>
            PRIMARY
          </Button>
          <Text style={styles.center}>{"\n"}Food Order Schedule{"\n"}</Text>
          <CardDashboard />
        <CardDashboard />
          <CardDashboard />
          <CardDashboard />
        </ScrollView>
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginLeft: 30,
  },
  CardDashboardContainer: {
    backgroundColor: 'red'

  }
});

export default Dashboard;

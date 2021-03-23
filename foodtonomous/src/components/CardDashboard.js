import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Toggle,
  Card,
  Icon,
} from '@ui-kitten/components';
import {updateScheduleStatus} from "../store/actions/automationSchedule";
import {useDispatch} from 'react-redux'

const ClockIcon = (props) => (
  <Icon name='clock-outline' {...props} />
);



function CardDashboard({setAutomation, data: {food, id, restaurant, isActive, time}, user: {id: userId, role} }) {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(isActive)
  useEffect(() => {
    dispatch(updateScheduleStatus({id, isActive: isChecked}))
    setAutomation({id, isActive: isChecked})
  }, [isChecked])
  
  const Header = (props, name) => (
    <View {...props}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name='home-outline' fill='black' width={24} height={24} />
        <Text
        category='h6'
        >{' '}{restaurant.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Icon name='clock-outline' fill='black' width={24} height={24} />
        <Text>{' '}{time}</Text>
      </View>
    </View>
  );
  return (
    <>
    <Card style={styles.card} header={Header}>
    
        <View style={styles.container}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              style={styles.tinyLogo}
              source={{uri: food.picture}}
            />
            <View style={{marginLeft: 15}}>
              <Text
              category='h6'
              >
                {food.name}
              </Text>
              <Text>
                RP.{food.price}
              </Text>
            </View>
          </View>
          <Layout style={styles.containerBtn} level='1'>
          </Layout>
          <View  style={{display:'flex', justifyContent: 'center',marginLeft: 10}}>
            <Toggle
            checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          </View>
        </View>
    </Card>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
    flex: 1,
    justifyContent: 'space-between'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 9,
    elevation: 2,
    borderRadius: 15,
    backgroundColor: 'white'
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  button: {
    margin: 2,
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tinyLogo: {
    width: 55,
    height: 55,
  },
});

export default CardDashboard

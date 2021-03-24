import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import {
  Layout,
  Toggle,
  Icon,
  Divider
} from '@ui-kitten/components';
import {updateScheduleStatus ,deleteSchedule} from "../store/actions/automationSchedule";
import {useDispatch} from 'react-redux'
import ModalComponent from './ModalComponent';

const TrashIcon = (props) => (
  <Icon name='trash-2-outline' {...props} />
);

function CardDashboard({setAutomation, data: {food, id, restaurant, isActive, time}, user: {id: userId, role} }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(isActive)
  useEffect(() => {
    dispatch(updateScheduleStatus({id, isActive: isChecked}))
    setAutomation({id, isActive: isChecked})
  }, [isChecked])
  
  const onDelete = () => {
    setVisible(true)
  }
  

  return (
    <>
    <Card style={styles.card}>
      <ModalComponent visible={visible} foodName={food.name} setVisible={setVisible}  id={id}/>
        <View style={styles.container}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              style={styles.tinyLogo}
              source={{uri: food.picture}}
            />
            <View style={{marginLeft: 15}}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name='credit-card-outline' fill='black' width={24} height={24} />
                  <Text
                  category='h6'
                  style={{fontWeight: 'bold'}}
                  >{' '}{food.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name='home-outline' fill='black' width={24} height={24} />
                  <Text
                  style={{fontWeight: 'bold'}}
                  >{' '}{restaurant.name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                  style={
                    {fontWeight:'bold'}
                  }
                  >{' '}Rp.
                  </Text>
                  <Text>
                    {food.price}
                  </Text>
                </View>
              </View>
              <Divider/>
              <View  style={styles.footerContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name='clock-outline' fill='black' width={24} height={24} />
                  <Text>{' '}{time}</Text>
                </View>
                <Button appearance='ghost' status='danger'
                  accessoryLeft={TrashIcon}
                  onPress={() => setVisible(true)}
                  >
                </Button>
                <Toggle status='success' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              </View>
            </View>
          </View>
        </View>
    </Card>
    </>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container:{
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
    flex: 1,
    justifyContent: 'space-between',
    margin: -15

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
    borderRadius: 10,
    backgroundColor: 'white',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tinyLogo: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginLeft: -8,
    marginTop: 3.1

  },
  footerContainer: {
    width: 210,
    display:'flex', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CardDashboard

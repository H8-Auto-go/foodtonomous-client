import React, { useState } from 'react'
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {
  Layout,
  Toggle,
  Icon,
  Divider
} from '@ui-kitten/components';
import {useDispatch} from 'react-redux'
import {deleteSchedule} from "../store/actions/automationSchedule";

function ModalComponent({isModalVisible, setIsModalVisible, modalTitle, modalDescription, setIsConfirmed}) {


const dispatch = useDispatch()

    const onDelete = () => console.log(`${foodName} deleted!!!!`)
  return (
    <>
      <Modal
        visible={isModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsModalVisible(false)}>
        <Card disabled={true} style={{width: '95%', right: '-2%'}}>
          <View style={{height: 200, flexDirection: 'column', justifyContent: 'space-around'}}>

          <View>
             <Text 
            category='h5'
            style={{fontWeight: 'bold'}}
            >{modalTitle}</Text>
          </View>
          <Divider/>
            <View><Text category='h6'>{modalDescription}</Text></View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button 
              onPress={()=> setIsConfirmed(true)}
              status='success' appearance='outline' style={{width: 90}}>OK</Button>
              <Button onPress={() => setIsModalVisible(false)} status='danger' style={{width: 90}}>Cancel</Button>
            </View>
          </View>
        </Card>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ModalComponent

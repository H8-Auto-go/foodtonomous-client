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

function ModalComponent({visible, setVisible, foodName, id}) {
//   const [visible, setVisible] = useState(false);

const dispatch = useDispatch()

    const onDelete = () => console.log(`${foodName} deleted!!!!`)
  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{width: '95%', right: '-2%'}}>
          <View style={{height: 200, flexDirection: 'column', justifyContent: 'space-around'}}>

          <View>
             <Text 
            category='h5'
            style={{fontWeight: 'bold'}}
            >WARNING!!</Text>
          </View>
          <Divider/>
            <View><Text category='h6'>Are you sure want to delete {foodName} from your automation schedule?</Text></View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button 
              onPress={()=> dispatch(deleteSchedule(id))}
              status='success' appearance='outline' style={{width: 90}}>OK</Button>
              <Button onPress={() => setVisible(false)} status='danger' style={{width: 90}}>Cancel</Button>
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

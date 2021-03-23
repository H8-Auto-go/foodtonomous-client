import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Toggle,
  Card,
} from '@ui-kitten/components';
import {updateScheduleStatus} from "../store/actions/automationSchedule";
import {useDispatch} from 'react-redux'

// const Header = (props) => (
//   <View {...props}>
//     <Text category="h6">my daily food automation</Text>
//     {/* <Text category="s1">jam ordernya</Text> */}
//   </View>
// );


function CardDashboard({setAutomation, data: {food, id, restaurant, isActive}, user: {id: userId, role} }) {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(isActive)
  useEffect(() => {
    dispatch(updateScheduleStatus({id, isActive: isChecked}))
    setAutomation({id, isActive: isChecked})
  }, [isChecked])
  return (
    <>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{uri: food.picture}}
          />
          <View>
            <Text>
              {food.name}
            </Text>
            <Text>
              RP.{food.price}
            </Text>
          </View>
          <Toggle checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
          <Layout style={styles.containerBtn} level='1'>
            <Button style={styles.button} size='tiny' appearance='ghost'>
              X
            </Button>
          </Layout>
        </View>
    </Card>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    padding: 1

  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 55
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default CardDashboard

import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  // ApplicationProvider,
  Button,
  Icon,
  // IconRegistry,
  Layout,
  Text,
  // TopNavigation,
  Toggle,
  Card,
} from '@ui-kitten/components';
// import {EvaIconsPack} from '@ui-kitten/eva-icons';
// import * as eva from '@eva-design/eva';
// import {NavbarTop} from './NavbarTop';

const ClockIcon = (props) => (
  <Icon name='clock-outline' {...props} />
);


function CardDashboard({ setStatusOrder, data: {food, restaurant, time}, setOrder, user: {id, role} }) {
  const [checked, setChecked] = React.useState(false);

  const Header = (props, name) => (
    <View {...props}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name='credit-card-outline' fill='black' width={24} height={24} />
        <Text
        category='h6'
        >{' '}{restaurant.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Icon name='clock-outline' fill='black' width={24} height={24} />
        <Text>{' '}{time}</Text>
      </View>
      {/* <Text category="s1">jam ordernya</Text> */}
    </View>
  );
  
  useEffect(() => {
    if(role === 'user') {
      if(checked) {
        setOrder({
          userId: id,
          foodId: food.id,
          restaurantId: restaurant.id
        })
      }
    } else {
      setStatusOrder(checked?"done":"")
    }
  }, [checked])
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
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

          {/* {role === 'user'
          ? <Text>untuk mesan(sementara)</Text>
          : <Text>menyelesaikan orderan(sementara)</Text>} */}
          
          <Layout style={styles.containerBtn} level='1'>
            {/* <Button style={styles.button} size='tiny' appearance='ghost'>
              X
            </Button> */}
          </Layout>
          <View  style={{display:'flex', justifyContent: 'center',marginLeft: 10}}
>
            <Toggle
            checked={checked} onChange={onCheckedChange} />
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
    // width: 370,
    borderRadius: 15,
    backgroundColor: 'ghostwhite'
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

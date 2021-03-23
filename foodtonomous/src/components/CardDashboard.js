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

const Header = (props) => (
  <View {...props}>
    <Text category="h6">my daily food automation</Text>
    {/* <Text category="s1">jam ordernya</Text> */}
  </View>
);


function CardDashboard({ setStatusOrder, data: {food, restaurant}, setOrder, user: {id, role} }) {
  const [checked, setChecked] = React.useState(false);

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
      <Card style={styles.card}>
        <View style={styles.container}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              style={styles.tinyLogo}
              source={{uri: food.picture}}
            />
            <View style={{marginLeft: 15}}>
              <Text>
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
    margin: 2,
    elevation: 2
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

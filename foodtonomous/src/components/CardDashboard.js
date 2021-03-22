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
      <Card style={styles.card} header={Header}>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{uri: food.picture}}
          />
          {/*<Text>*/}
          {/*    {food.name}*/}
          {/*</Text>*/}
          {/*<Text>*/}
          {/*    RP.{food.price}*/}
          {/*</Text>*/}
          {role === 'user'
          ? <Text>untuk mesan(sementara)</Text>
          : <Text>menyelesaikan orderan(sementara)</Text>}
          <Toggle checked={checked} onChange={onCheckedChange}>
            {`Auto: ${checked ? 'on' : 'off'}`}
          </Toggle>
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
    margin: 2,
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
    width: 50,
    height: 50,
  },
});

export default CardDashboard

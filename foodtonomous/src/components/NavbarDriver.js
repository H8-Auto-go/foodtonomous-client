import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image, Dimensions, yellowBox } from 'react-native';
import { useSelector } from 'react-redux'
import {
  Button,
  Icon,
  Text,
  Card,
  Layout,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Avatar
} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/users'
import { useNavigation } from '@react-navigation/native';

function NavbarDriver() {
  const navigation = useNavigation(); 
  const dispatch = useDispatch()

  const NavigationIcon = (props) => (
    <Icon {...props} name='navigation-2'/>
  );
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  
  const handleLogout = () => {
    // navigation.navigate('LoginPage')
    //untuk hit ke actions
    dispatch(logout(navigation))
  }

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        style={{backgroundColor: '#ffbf69'}}
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem 
          onPress={() => navigation.navigate('Home')}
            accessoryLeft={HomeIcon}
            title="Home"
          />
        <MenuItem
          onPress={() => navigation.navigate('MapTracking')}
          accessoryLeft={NavigationIcon}
          title="Map"
        />
        <MenuItem 
          onPress={() => handleLogout()}
          accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );
  const HomeIcon = (props) => (
    <Icon {...props} name='home'/>
  );
  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out'/>
  );
  const MenuIcon = (props) => (
  <Icon name='menu' {...props} />
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../assets/logoNav.png')}
      />
    </View>
  );

  return (
    <>
      <Layout level='4'>
        <TopNavigation
          alignment='center'
          title={renderTitle}
          // subtitle='HelloFood Driver'
          accessoryLeft={renderRightActions}
        />
      </Layout>
    </>
  )
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
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  CardDashboardContainer: {
    backgroundColor: 'red'

  },
  layoutContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ghostwhite'
  },
  driverWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 10,
    borderRadius: 10,

  },
  cardDriver: {
    // margin: 40,
    // borderRadius: 10,
    // alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
    width: 150,
    borderRadius: 0,
    height: 100,
    marginTop: -25
  },
});

export default NavbarDriver


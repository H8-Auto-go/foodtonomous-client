import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Avatar } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../store/actions/users'
import { useDispatch } from 'react-redux'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const NavigationIcon = (props) => (
  <Icon {...props} name='navigation-2'/>
);

const HomeIcon = (props) => (
  <Icon {...props} name='home'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const CarIcon = (props) => (
  <Icon {...props} name='car'/>
);

const MenuIcon = (props) => (
  <Icon name='menu' {...props} />
);
const PlusIcon = (props) => (
  <Icon name='plus-square' {...props} />
);
export const NavbarTop = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation(); 

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const handleLogout = () => {
    // navigation.navigate('LoginPage')
    //untuk hit ke actions
    dispatch(logout(navigation))
  }
  const renderLeftActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem 
        onPress={() => navigation.navigate('Home')}
          accessoryLeft={HomeIcon}
          title="Home"
        />
        <MenuItem
          onPress={() => navigation.navigate('AutomationSetting')}
          accessoryLeft={PlusIcon}
          title="Add Schedule"
        />
        <MenuItem
          onPress={() => navigation.navigate('OrderHistory')}
          accessoryLeft={CarIcon}
          title="Order History"
        />
        <MenuItem 
          onPress={() => handleLogout()}
          accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
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
    <Layout style={styles.container} level='4'>
      <TopNavigation
        alignment='center'
        title={renderTitle}
        // subtitle='schedule your food'
        accessoryLeft={renderLeftActions}
        style={{backgroundColor: '#51F0B0'}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   minHeight: 65,
  //   backgroundColor: '#bc6c25'
  // },
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
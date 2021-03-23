import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../store/actions/users'
import { useDispatch } from 'react-redux'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
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
  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem 
        onPress={() => navigation.navigate('Home')}
          accessoryLeft={InfoIcon}
          title="Home"
        />
        <MenuItem
          onPress={() => navigation.navigate('MapTracking')}
          accessoryLeft={InfoIcon}
          title="map"
        />
        {/* <MenuItem
          onPress={() => navigation.navigate('FavoriteFood')}
          accessoryLeft={InfoIcon}
          title="Favorite Food"
        /> */}
        <MenuItem
          onPress={() => navigation.navigate('OrderHistory')}
          accessoryLeft={InfoIcon}
          title="Order History"
        />
        <MenuItem
          onPress={() => navigation.navigate('AutomationSetting')}
          accessoryLeft={InfoIcon}
          title="Automation Setting"
        />
        <MenuItem
          onPress={() => navigation.navigate('ChatRoom')}
          accessoryLeft={InfoIcon}
          title="Chat Room"
        />
        <MenuItem 
          onPress={() => handleLogout()}
          accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        alignment='center'
        title='Foodtonomous'
        subtitle='schedule your food'
        accessoryLeft={renderRightActions}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
  },
});
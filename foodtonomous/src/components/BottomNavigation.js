import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';


function BottomNavigation() {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title='USERS'/>
        <Tab title='ORDERS'/>
        <Tab title='TRANSACTIONS'/>
      </TabBar>
    </>
  )
}

export default BottomNavigation

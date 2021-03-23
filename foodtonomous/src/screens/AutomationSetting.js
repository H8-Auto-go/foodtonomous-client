import React, {setState, useState, useEffect} from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
// import {IndexPath, Layout, Select, SelectItem, Datepicker} from '@ui-kitten/components';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux'
import { addSchedule } from '../store/actions/automationSchedule'
// import { Picker } from '@react-native-picker/picker';
import {getFavouriteFoods} from '../store/actions/favouriteFoods';
import { useNavigation } from '@react-navigation/native';

function AutomationSetting() {
  const navigation = useNavigation();
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('')
  const [order, setOrder] = useState({})
  const favouriteFoods = useSelector(
    (state) => state.favoriteFoods.favoriteFoods,
  );
  // console.log(favouriteFoods);
  const [selectedFoodName, setSelectedFoodName] = useState('')
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFavouriteFoods());
    if (favouriteFoods.length !== 0) {
      setSelectedFoodName(favouriteFoods[0].food.name)
    }
  }, [dispatch]);


  const [foodId, setFoodId] = useState('')
  const [restaurantId, setRestaurantId] = useState('')
  function handleOnOK(e) {
    e.preventDefault();
    let favFood = favouriteFoods.filter(food => {
      return food.food.name === selectedFoodName
    })
    let time = `${hour}.${minute}`
    let form = {
      time: time,
      isActive: false,
      restaurantId,
      foodId,
    };
    console.log(form);
    //hit ke action dan axios
    dispatch(addSchedule(form, navigation))

  }

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));


  return (
    <>
      <NavbarTop />
      <View style={styles.wrapper}>
        <View>
          <Text>Add food to the automation {'\n'}</Text>
          <View >
            <Text>Enter time</Text>
            <View style={styles.timeInputContainer}>
              <TextInput onChangeText={(value) => setHour(value)}/>
              <Text>:</Text>
              <TextInput onChangeText={(value) => setMinute(value)}/>
            </View>
            {/* <Button onPress={showDatePicker}  appearance='ghost'> pick a time </Button>
             <DateTimePickerModal
             isVisible={isDatePickerVisible}
             mode="time"
             locale="en_GB"
             onConfirm={handleConfirm}
             onCancel={hideDatePicker}
             /> */}
          </View>
          <Layout style={styles.container} level='1'>
            <Select
              selectedIndex={selectedIndex}
              onSelect={index => {
                setSelectedIndex(index)
                setFoodId(favouriteFoods[index.row].food.id)
                setRestaurantId(favouriteFoods[index.row].restaurant.id)
              }}>
              {favouriteFoods && favouriteFoods.map(favFood => (
                <SelectItem title={favFood.food.name} key={favFood.food.id}/>
              ))}
            </Select>
          </Layout>
          {/*{favouriteFoods && (*/}
          {/*  <Picker*/}
          {/*    selectedValue={selectedFoodName}*/}
          {/*    onValueChange={(itemValue, itemIndex) =>*/}
          {/*      setSelectedFoodName(itemValue)*/}
          {/*    }>*/}
          {/*    {favouriteFoods.map((food) => (*/}
          {/*      <Picker.Item key={food.food.id} label={food.food.name} value={food.food.name} />*/}
          {/*    ))}*/}
          {/*  </Picker>*/}
          {/*)}*/}


          {/* <Layout style={styles.container} level="1">
           <Select
           selectedIndex={selectedIndex}
           onSelect={index => setSelectedIndex(index)}>
           <SelectItem title='lele goreng'/>
           <SelectItem title='lele rebus'/>
           <SelectItem title='lele kukus'/>
           </Select>
           </Layout> */}
          <View style={{display: 'flex', flexDirection: 'row',  justifyContent: 'space-between'}}>
            <Button status="success" onPress={handleOnOK}> add to schedule </Button>
            <Button status="danger" onPress={() => navigation.navigate('Home')}> cancel </Button>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 60,
    // backgroundColor: 'red'
  },
  container: {
    minHeight: 128,
  },
  timeInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'ghostwhite',
    justifyContent: "space-around",
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    width: 200,
  },
});

export default AutomationSetting;

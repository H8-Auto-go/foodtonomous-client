import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';
import React, {setState, useState, useEffect} from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import { useDispatch, useSelector } from 'react-redux'
import { addSchedule } from '../store/actions/automationSchedule'
import {getFavouriteFoods} from '../store/actions/favouriteFoods';
import { useNavigation } from '@react-navigation/native';

export default function AutomationSetting() {
  const [foodId, setFoodId] = useState('')
  const [restaurantId, setRestaurantId] = useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const navigation = useNavigation(); 
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [selectedFoodName, setSelectedFoodName] = useState('')
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const displayValue = data[selectedIndex.row];

  const favouriteFoods = useSelector(
    (state) => state.favoriteFoods.favoriteFoods,
  );

  const renderOption = (title, i) => (
    <SelectItem title={title} key={i}/>
  );

  useEffect(() => {
    if(favouriteFoods.length > 0) {
      setData(favouriteFoods.map(favFood => favFood.food.name))
    }
  }, [favouriteFoods])
  useEffect(() => {
    dispatch(getFavouriteFoods());
    // if (favouriteFoods.length !== 0) {
    //   setSelectedFoodName(favouriteFoods[0].food.name) 
    // }
  }, [dispatch]);

  function handleOnOK(e) {
    let time = `${hour}.${minute}`
    e.preventDefault();
    let favFood = favouriteFoods.filter(food => {
      return food.food.name === selectedFoodName
    })
    let form = {
      time: time,
      isActive: false,
      restaurantId,
      foodId,
    };
    // console.log(form, '<<<<< this is form');
    //hit ke action dan axios
    dispatch(addSchedule(form, navigation))
  
  }

  return (
    <>
    {data.length > 0 && (
      <>
          <NavbarTop />
    <View style={styles.wrapper}>
      <View style={styles.formContainer}>
      <Text
      category='h3'
      >Add food to your Schedule{'\n'}</Text>
        <View style={styles.enterTimeContainer}>
          <Text>Enter time:</Text>
          <View style={styles.timeInputContainer}>
            <TextInput keyboardType = 'numeric' onChangeText={(value)=> setHour(value)}></TextInput>
            <Text>:</Text>
            <TextInput keyboardType = 'numeric' onChangeText={(value)=> setMinute(value)}></TextInput>
          </View>
        </View>

        <Layout style={styles.container} level='1'>
          <Text>
            Select Favorite Foods:
          </Text>
            <Select
            value={displayValue}
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
    <View style={{display: 'flex', flexDirection: 'row',  justifyContent: 'space-between'}}>
          <Button status="success" onPress={handleOnOK}> add to schedule </Button>
          <Button status="danger" onPress={() => navigation.navigate('Home')}> cancel </Button>
        </View>
    </View>
    </View>
      </>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 192,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 55,
  },
  container: {
    height: 128,
  },
  timeInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'ghostwhite',
    justifyContent: "space-around",
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    width: 100,
    height: 45
  },
  formContainer: {
    backgroundColor: 'white',
    elevation: 1,
    padding: 10,
    borderRadius: 10,
  },
  enterTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 15
  }
});
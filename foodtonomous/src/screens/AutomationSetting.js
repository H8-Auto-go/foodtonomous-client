import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button, Text} from '@ui-kitten/components';
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
  // const [selectedFoodName, setSelectedFoodName] = useState('')
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const displayValue = data[selectedIndex.row];

  const favouriteFoods = useSelector(state => state.favoriteFoods.favoriteFoods);

  // const renderOption = (title, i) => <SelectItem title={title} key={i}/>

  useEffect(() => {
    if(favouriteFoods.length > 0) {
      setData(favouriteFoods.map(favFood => favFood.food.name))
    }
  }, [favouriteFoods])

  useEffect(() => {
    dispatch(getFavouriteFoods());
  }, [dispatch]);

  function handleOnOK(e) {
    e.preventDefault();
    let time = `${hour}.${minute}`;
    // let favFood = favouriteFoods.filter(({food}) => food.name === selectedFoodName)
    let form = {
      time: time,
      isActive: false,
      restaurantId,
      foodId,
    };
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
            style={{textAlign: 'center', marginBottom: 25}}
            >Add food to your Schedule{'\n'}</Text>
            <View style={styles.enterTimeContainer}>
              <Text>Enter Time :</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.timeInputContainer}>
                  <TextInput keyboardType='numeric' placeholder='HH' onChangeText={(value)=> setHour(value)}></TextInput>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.timeInputContainer}>
                  <TextInput keyboardType='numeric' placeholder='MM' onChangeText={(value)=> setMinute(value)}></TextInput>
                </View>
              </View>
            </View>
            <Layout style={styles.container} level='1'>
              <Text style={{marginBottom: 10}}>Select Foods :</Text>
              <Select value={displayValue}
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
            <View style={{display: 'flex', flexDirection: 'row',  justifyContent: 'space-around', marginBottom: 10}}>
              <Button status="success" onPress={handleOnOK}> Add to Schedule </Button>
              <Button status="danger" onPress={() => navigation.navigate('Home')}> Cancel </Button>
            </View>
          </View>
        </View>
      </>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 25,
  },
  container: {
    height: 110,
  },
  timeInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'ghostwhite',
    justifyContent: "space-around",
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 1,
    width: 45,
    height: 40
  },
  formContainer: {
    backgroundColor: 'white',
    elevation: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  enterTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
});
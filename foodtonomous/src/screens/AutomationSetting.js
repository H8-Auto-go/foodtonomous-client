import React, {setState, useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Button, Input} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Datepicker,
} from '@ui-kitten/components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addSchedule} from '../store/actions/automationSchedule';
import {Picker} from '@react-native-picker/picker';
import {getFavouriteFoods} from '../store/actions/favouriteFoods';

function AutomationSetting() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('');
  const [selectedFoodName, setSelectedFoodName] = useState('');
  const favouriteFoods = useSelector(
    (state) => state.favoriteFoods.favoriteFoods,
  );
  // console.log(favouriteFoods);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavouriteFoods());
  }, [dispatch]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log('A date has been picked: ', time.toLocaleTimeString('id-ID'));
    setTime(time.toLocaleTimeString('id-ID'));
    hideDatePicker();
  };

  function handleOnOK(e) {
    e.preventDefault();
    let favFood = favouriteFoods.filter(food => {
      return food.food.name === selectedFoodName
    })
    let form = {
      time,
      iSactive: false,
      restaurantId: favFood[0].food.id,
      foodId: favFood[0].restaurant.id
    };
    console.log(form);
    //hit ke action dan axios
    // dispatch(addSchedule(form))
  }

  return (
    <View style={styles.wrapper}>
      <NavbarTop />
      <View>
        <View>
          <Button onPress={showDatePicker} appearance="ghost">
            {' '}
            pick a time{' '}
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            locale="en_GB"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        {favouriteFoods && (
          <Picker
            selectedValue={selectedFoodName}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFoodName(itemValue)
            }>
            {favouriteFoods.map((food) => (
              <Picker.Item label={food.food.name} value={food.food.name} />
            ))}
          </Picker>
        )}

        {/* <Layout style={styles.container} level="1">
        <Select
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <SelectItem title='lele goreng'/>
          <SelectItem title='lele rebus'/>
          <SelectItem title='lele kukus'/>
        </Select>
        </Layout> */}

        <Button onPress={handleOnOK}> ok </Button>
        <Button> cancel </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    height: 128,
  },
});

export default AutomationSetting;

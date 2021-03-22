import React, {setState, useState} from 'react';
import {StyleSheet, View, TextInput } from 'react-native';
import {Button, Input} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import {IndexPath, Layout, Select, SelectItem, Datepicker} from '@ui-kitten/components';
import DatePicker from 'react-native-datepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux'
import { addSchedule } from '../store/actions/automationSchedule'
import { Picker } from '@react-native-picker/picker';

function AutomationSetting() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('')
  const [orderName, setOrderName] = useState('')
  const [selectedFoodName, setSelectedFoodName] = useState('')
  // const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const dispatch = useDispatch()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A date has been picked: ", time.toLocaleTimeString('id-ID'));
    setTime(time.toLocaleTimeString('id-ID'))
    hideDatePicker();
  };

  function handleOnOK(e) {
    e.preventDefault()
    let form = {
      time,
      orderName,
      selectedIndex
    }
    console.log(form);
    //hit ke action dan axios
    // dispatch(addSchedule(form))
  }



  return (
    <View style={styles.wrapper}>
      <NavbarTop />
      <View>
        <Input
          placeholder="Name Orderan"
          value={orderName}
          onChangeText={(nextValue) => setOrderName(nextValue)}
        />
        <View>
          <Button onPress={showDatePicker}  appearance='ghost'> pick a time </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            locale="en_GB"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <Picker
          selectedValue={selectedFoodName}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFoodName(itemValue)
          }>
          <Picker.Item label="lele goreng" value="lele goreng" />
          <Picker.Item label="lele rebus" value="lele rebus" />
          <Picker.Item label="lele fermentasi" value="lele fermentasi" />
        </Picker>

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

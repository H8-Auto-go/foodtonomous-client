import React, {setState, useState} from 'react';
import {StyleSheet, View } from 'react-native';
import {Button, Input} from '@ui-kitten/components';
import {NavbarTop} from '../components/NavbarTop';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';
import DatePicker from 'react-native-datepicker';

function AutomationSetting() {

  const [date, setDate] = useState("2016-05-15")
  const [value, setValue] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);
  return (
    <View style={styles.wrapper}>
      <NavbarTop />
      <View>
        <Input
          placeholder="Name"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
        <DatePicker
          style={{width: 200}}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(value) => {
            setState({date: value});
          }}
        />
        <Layout style={styles.container} level="1">
          <Select
            multiSelect={true}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            <SelectItem title="makanan A" />
            <SelectItem title="makanan B" />
            <SelectItem title="makanan C" />
          </Select>
        </Layout>
        <Button> ok </Button>
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

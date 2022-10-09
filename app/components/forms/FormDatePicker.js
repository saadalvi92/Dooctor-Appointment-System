import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import colors from '../../config/colors';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormDatePicker = () => {
  const [date, setDate] = useState('09-10-2021');

  return (
    <View style={styles.container}>
      <DatePicker
        style={styles.datePickerStyle}
        date={date}
        mode="date"
        placeholder="select date"
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2000"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            borderColor: 'gray',
            borderWidth: 0,
            alignItems: 'flex-start',
          },
          placeholderText: {
            fontSize: 17,
            color: 'gray',
          },
          dateText: {
            fontSize: 17,
          },
          dateTouchBody: {
            flexDirection: 'row-reverse',
            marginHorizontal: 5,
          },
        }}
        onDateChange={date => {
          setDate(date);
        }}
        iconComponent={
          <MaterialCommunityIcons
            style={{marginRight: 4}}
            name="calendar"
            size={25}
            color={colors.medium}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#ddd',
    padding: 6,
  },

  datePickerStyle: {
    width: '100%',
  },
});

export default FormDatePicker;

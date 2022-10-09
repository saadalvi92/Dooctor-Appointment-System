import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import Screen from '../../components/Screen';
import DropDownField from '../../components/forms/DropDownField';
import AppText from '../../components/Text';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function TherapistStat(props) {
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format('YYYY'),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format('MM'),
  );
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [years, setYears] = useState(() => {
    const currentYear = moment(new Date()).format('YYYY');
    var Years = [currentYear];
    for (let index = 0; index < 30; index++) {
      Years.push((Years[index] - 1).toString());
    }
    return Years;
  });
  const [months, setMonths] = useState(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (selectedYear == moment(new Date()).format('YYYY')) {
      return months.slice(0, moment(new Date()).format('MM'));
    } else {
      return months;
    }
  });
  useEffect(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (selectedYear == moment(new Date()).format('YYYY')) {
      setMonths(months.slice(0, moment(new Date()).format('MM')));
    } else {
      setMonths(months);
    }
  }, [selectedYear]);
  const designation = ['Therapist', 'Client', 'Practice'];
  return (
    <Screen>
      <View
        style={{flexDirection: 'row', marginHorizontal: '5%', marginTop: '3%'}}>
        <View style={{flex: 1, marginRight: '2%'}}>
          <AppText style={{fontSize: RFValue(12), color: '#304659'}}>
            Designation
          </AppText>
          <View style={{height: 60}}>
            <DropDownField
              data={designation}
              Select={e => {
                setSelectedDesignation(e);
              }}
              styles={{
                height: hp('5.5'),
                width: wp('28%'),
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#B8D4E0',
                marginBottom: 20,
              }}
              Text={{fontSize: RFValue(12)}}
            />
          </View>
        </View>
        <View style={{flex: 1, marginRight: '2%'}}>
          <AppText style={{fontSize: RFValue(12), color: '#304659'}}>
            Year
          </AppText>
          <View style={{height: 60}}>
            <DropDownField
              data={years}
              Select={e => {
                setSelectedYear(e);
              }}
              styles={{
                height: hp('5.5'),
                width: wp('28%'),
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#B8D4E0',
                marginBottom: 20,
              }}
              Text={{fontSize: RFValue(12)}}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <AppText style={{fontSize: RFValue(12), color: '#304659'}}>
            Month
          </AppText>
          <DropDownField
            data={months}
            Select={e => {
              setSelectedMonth(e);
            }}
            styles={{
              flex: 1,
              height: hp('5.5'),
              width: wp('28%'),
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#B8D4E0',
              marginBottom: 20,
            }}
            Text={{fontSize: RFValue(12)}}></DropDownField>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Patient Visit Average</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>256</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Patient Visit Average</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>256</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Show Rate</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>$36,00,000</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Dollar Visit Average</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>256</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Inquiry Conversion Rate</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>$36,00,000</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Revenue Projection</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>256</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>Current Revenue</Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.text}>$36,00,000</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

export default TherapistStat;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff63',
    marginTop: '2%',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '2%',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 5,
  },
  text: {color: '#000', marginRight: '2%'},
  secondContainer: {justifyContent: 'center'},
});

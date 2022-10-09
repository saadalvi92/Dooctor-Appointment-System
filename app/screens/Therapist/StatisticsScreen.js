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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../../utils/baseUrl';
function StatisticsScreen(props) {
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format('YYYY'),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format('MM'),
  );
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
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
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
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const detailUser = JSON.parse(data);
    const detailSession = JSON.parse(data1);
    setUser(detailUser);
    setSession(detailSession);
    console.log('The get Data is working', detailSession);
    console.log('The get Data is working', detailUser);
    const apiData = {
      year: '2022',
      month: '03',
    };
    let config = {
      method: 'post',
      url: `${baseUrl}doc_stats`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: detailSession.session_key,
      },
      data: apiData,
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Screen top={true}>
      <View style={{alignItems: 'center'}}>
        <AppText
          style={{fontSize: RFValue(20), color: '#304659', fontWeight: '400'}}>
          Therapist Stats
        </AppText>
      </View>
      <View
        style={{flexDirection: 'row', marginHorizontal: '5%', marginTop: '3%'}}>
        <View style={{flex: 1, marginRight: '5%'}}>
          <AppText style={{fontSize: RFValue(12), color: '#304659'}}>
            Year
          </AppText>
          <View style={{height: 60}}>
            <DropDownField
              data={years}
              Select={e => {
                setSelectedYear(e);
              }}
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
            }}></DropDownField>
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

export default StatisticsScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff63',
    marginTop: '4%',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '2%',
    width: '90%',
    height: 34,
    alignSelf: 'center',
    borderRadius: 5,
  },
  text: {color: '#000', marginRight: '2%', fontSize: RFValue(12)},
  secondContainer: {
    justifyContent: 'center',
    fontSize: RFValue(12),
    fontWeight: '400',
  },
});

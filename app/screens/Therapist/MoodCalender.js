import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Calendar from '../../components/Calendar';
import Screen from '../../components/Screen';
import AppText from '../../components/Text';
import Modal from 'react-native-modal';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {baseUrl} from '../../utils/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../config/colors';
function MoodCalender(props) {
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment(Date.now()).format('YYYY-MM-DD'),
  );
  const [userModes, setUserModes] = useState([]);
  const [mood, setMood] = useState({});
  const [markedDates, setMarkedDates] = useState([]);
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userSting = await AsyncStorage.getItem('user');
    const sessionString = await AsyncStorage.getItem('session');
    const userDetails = JSON.parse(userSting);
    const sessionDetails = JSON.parse(sessionString);
    setSession(sessionDetails);
    console.log('session is ', sessionDetails);
    console.log('user is ', userDetails);
    let config = {
      method: 'get',
      url: `${baseUrl}get_user_modes?user_id=${props.route.params.customer.id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: sessionDetails.session_key,
      },
    };

    axios(config)
      .then(response => {
        console.log('the response data is here', response.data.data);
        const newData = response.data.data.modes.map((item, index) => {
          return {
            date: item.date,
            color: item.mode_detail.color,
            id: item.id,
            mode_id: item.mode_id,
            mode_detail_id: item.mode_detail.id,
          };
        });
        const filteredData = newData.filter((item, index) => {
          if (item.date <= moment(Date.now()).format('YYYY-MM-DD')) {
            return item;
          }
        });

        createMarkedDates(filteredData);
        setUserModes(filteredData);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        alert(error.response.data.message);
        console.log(error);
      });
  };
  const createMarkedDates = dates => {
    let markedEvents = {};
    let numEvents = {};
    let uniqueDates = [...new Set(dates.map((item, index) => item.date))]; //remove duplicate event dates

    dates.forEach(function (count) {
      //if multiple events on one date, determine how many events are on each date
      numEvents[count] = (numEvents[count] || 0) + 1;
    });
    uniqueDates.forEach(function (date, index) {
      let dots = [];
      let markedData = {};
      markedData['dots'] = dots; //set the array of dots
      markedEvents[date] = markedData; //add markers to marked dates
      markedData['selected'] = true;
      markedData['customStyles'] = {
        container: {
          backgroundColor: dates[index].color,
          borderRadius: 8,
        },
        text: {
          color: '#fff',
        },
      };
      markedData['selectedColor'] = dates[index].color;
      markedData['id'] = dates[index].id;
      markedData['mode_id'] = dates[index].mode_id;
      markedData['mode_detail_id'] = dates[index].mode_detail_id;
      markedData['disabled'] = true;
    });
    setMarkedDates(markedEvents);
  };

  const getCustomMood = date => {
    setLoading(true);
    let config = {
      method: 'post',
      url: 'http://3.18.236.184/theralign/api/v1/get_client_mode_calendar',
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {date: date, user_id: props.route.params.customer.id},
    };

    axios(config)
      .then(response => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        setMood(response.data.data.modes[0]);
        setModal(true);
      })
      .catch(error => {
        setLoading(false);
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <Screen>
      <View>
        {loading ? (
          <Spinner
            visible={true}
            textContent={''}
            textStyle={{
              color: '#FFF',
            }}
            color={colors.danger}
          />
        ) : null}
        <Modal
          isVisible={modal}
          onBackdropPress={() => {
            setModal(false);
          }}>
          {mood?.id ? (
            <View
              style={{
                backgroundColor: '#DCEAF4',
                height: '40%',
                width: '95%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 18}}
                onPress={() => {
                  setModal(false);
                }}>
                <Image source={require('../../assets/images/Cross.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: mood.mode.border_color,
                  justifyContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '16%',
                  marginHorizontal: '25%',
                  borderRadius: 5,
                  paddingHorizontal: '10%',
                  marginBottom: '2%',
                }}
                onPress={() => {
                  setModal(false);
                }}>
                <Text style={{fontSize: RFValue(12), color: '#fff'}}>
                  {mood.mode.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: mood.mode_detail.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '16%',
                  marginHorizontal: '25%',
                  borderRadius: 5,
                  paddingHorizontal: '10%',
                }}
                onPress={() => {
                  setModal(false);
                }}>
                <Text style={{fontSize: RFValue(12), color: '#fff'}}>
                  {mood.mode_detail.title}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: '#000',
                  fontSize: RFValue(16),
                  fontWeight: '400',
                }}>
                {moment(selectedDate).format('D-MMMM-YYYY')}
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#DCEAF4',
                height: '40%',
                width: '95%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: RFValue(18),
                  fontWeight: '400',
                }}>
                No Mood has been set
              </Text>
            </View>
          )}
        </Modal>
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: '30%',
        }}>
        <AppText style={{fontSize: RFValue(20), fontWeight: 'bold'}}>
          Mood Calender
        </AppText>
      </View>

      <Calendar
        goto={date => {
          console.log('The date is here');
          setSelectedDate(date);
          getCustomMood(date);
        }}
        route={props.route}
        style={{width: '95%', alignSelf: 'center', height: '50%'}}
        markedDates={markedDates}
      />
    </Screen>
  );
}

export default MoodCalender;

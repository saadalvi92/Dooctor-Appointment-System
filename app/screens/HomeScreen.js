import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import colors from '../config/colors';
import SearchField from '../components/SearchField';
import HorizontalColorfulCardList from '../components/HorizontalColorfulCardList';
import Cards from '../components/Cards';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import moment from 'moment';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {RFValue as RF, RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../utils/baseUrl';
function HomeScreen({navigation, route}) {
  const [mood, setMood] = useState({});
  const [descriptionList, setDescriptionListList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [modal, setModal] = useState(false);
  const [subMood, setSubMood] = useState({});
  const [moodsList, setMoodsList] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  const [userModes, setUserModes] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [showMoods, setShowMoods] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    const defaultUser = await AsyncStorage.getItem('user');
    const defaultSession = await AsyncStorage.getItem('session');
    const currentSession = JSON.parse(defaultSession);
    const currentUser = JSON.parse(defaultUser);
    setUser(currentUser);
    setSession(currentSession);
    let config = {
      method: 'get',
      url: `${baseUrl}get_modes`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: currentSession.session_key,
      },
    };

    axios(config)
      .then(response => {
        getUserMoods(currentSession, currentUser);
        setMoodsList(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('The error is', error.response);
      });
  };
  const getUserMoods = (currentSession, currentUser) => {
    let config = {
      method: 'get',
      url: `${baseUrl}get_user_modes?user_id=23`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: currentSession.session_key,
      },
    };

    axios(config)
      .then(response => {
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
      })
      .catch(error => {
        setLoading(false);
        console.log('The error is', error.response.data);
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
  const setMoodd = () => {
    setLoading(true);
    let config = {
      method: 'post',
      url: `${baseUrl}add_user_mode`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {
        date: moment(selectedDate).format('YYYY-MM-DD'),
        mode_id: subMood.mode_id,
        mode_detail_id: subMood.id,
      },
    };

    axios(config)
      .then(response => {
        setRefresh(!refresh);
        setModal(true);
        setDescriptionListList([]);
        setShowMoods(false);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <Screen style={styles.container}>
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
            setMood({});
            setSubMood({});
            setModal(false);
          }}>
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
            <Image
              source={require('../assets/images/CheckMood.png')}
              style={{marginBottom: '4%'}}
            />
            <TouchableOpacity
              style={{
                backgroundColor: mood.border_color,
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
              <Text style={{fontSize: RFValue(18), color: '#fff'}}>
                {mood.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: subMood.color,
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
              <Text style={{fontSize: RFValue(18), color: '#fff'}}>
                {subMood.title}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#000',
                fontSize: RFValue(16),
                fontWeight: '400',
                marginTop: '4%',
              }}>
              Your mood is successfully set
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: RFValue(16),
                fontWeight: '400',
              }}>
              {moment(selectedDate).format('D-MMMM-YYYY')}
            </Text>
          </View>
        </Modal>
      </View>
      <ScrollView style={{paddingTop: 10}} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />

        <SearchField navigation={navigation} />

        <View>
          <AppText style={{fontSize: RFValue(16)}}>Set your daily mood</AppText>
          {moodsList.length > 1 ? (
            <HorizontalColorfulCardList
              Data={moodsList}
              setState={e => {
                setMood(e);
                setSubMood(e.detail[0]);
                setDescriptionListList(e.detail);
              }}
            />
          ) : null}
        </View>

        {descriptionList.length != 0 && showMoods ? (
          <Cards
            Data={descriptionList}
            onPress={e => {
              setSubMood(e);
              var current = 0;
              userModes.map((item, index) => {
                if (item.date === selectedDate) {
                  current = 1;
                }
              });
              if (current == 0) {
                setMoodd();
              }
            }}
          />
        ) : null}
        <Calendar
          goto={date => {
            if (new Date(date) <= new Date(Date.now())) {
              setShowMoods(true);
              setSelectedDate(date);
            }
          }}
          route={route}
          markedDates={markedDates}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    paddingBottom: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bell_icon: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

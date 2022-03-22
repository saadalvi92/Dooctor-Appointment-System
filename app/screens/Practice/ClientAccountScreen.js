import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import AppText from '../../components/Text';
import Agenda from '../../components/Agenda';
import {RFValue} from 'react-native-responsive-fontsize';
import {imageUrl} from '../../utils/baseUrl';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ClientAccountScreen(props) {
  const data = props.route.params.item;
  const [image, setImage] = useState(data.image);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment(Date.now()).format('YYYY-MM-DD'),
  );

  useEffect(() => {
    getData();
  }, [selectedDate]);
  const getData = async () => {
    console.log('The user is', props.user);
    const user = await AsyncStorage.getItem('session');
    const session = JSON.parse(user);
    let config = {
      method: 'post',
      url: 'http://3.18.236.184/theralign/api/v1/client_history',
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
        data: {
          date: selectedDate,
          client_id: data.id,
        },
      },
    };

    axios(config)
      .then(response => {
        console.log('jkashdjkashjkdhasjkdh', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: '20%',
          marginHorizontal: '4%',
        }}>
        {image ? (
          <Image
            style={{
              height: 120,
              width: 120,
              margin: 10,
              alignSelf: 'center',
            }}
            source={{uri: `${imageUrl}${image}`}}
          />
        ) : (
          <Image
            style={{
              height: 117,
              width: 114,
              margin: 10,
              alignSelf: 'center',
              borderRadius: 4,
            }}
            source={require('../../assets/images/User.png')}
          />
        )}
        <View
          style={{
            flex: 1,
            width: '50%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: 'bold',
                fontSize: RFValue(13),
                marginBottom: '8%',
              }}>
              Name:
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: 'bold',
                fontSize: RFValue(13),
                marginBottom: '8%',
              }}>
              City:
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: 'bold',
                fontSize: RFValue(13),
                marginBottom: '8%',
              }}>
              Email:
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: 'bold',
                fontSize: RFValue(13),
                marginBottom: '8%',
              }}>
              Address:
            </Text>
          </View>
          <View style={{flex: 2.5}}>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: '500',
                fontSize: RFValue(13),
                marginBottom: '3%',
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: '500',
                fontSize: RFValue(13),
                marginBottom: '3%',
              }}>
              {data.city}
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: '500',
                fontSize: RFValue(13),
                marginBottom: '3%',
              }}>
              {data.email}
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontWeight: '500',
                fontSize: RFValue(13),
                marginBottom: '3%',
              }}>
              {data.address}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', margin: 10}}>
        <AppText
          style={{fontWeight: 'bold', fontSize: RFValue(20), color: '#304659'}}>
          Booked Appointments
        </AppText>
      </View>
      <View style={{flex: 1}}>
        <Agenda
          navigate={false}
          user={data}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
    </ScrollView>
  );
}

export default ClientAccountScreen;
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    color: colors.medium,
  },
  inputBio: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    color: colors.medium,
    height: '100%',
  },
  container: {flex: 1, padding: 10},
  back_btn: {
    marginVertical: 20,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    backgroundColor: '#fff',
    elevation: 3,
  },
});

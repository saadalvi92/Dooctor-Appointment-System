import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import ScheduleCalender from '../ScheduleCalendarScreen';
import colors from '../../config/colors';
import AppText from '../../components/Text';
import Agenda from '../../components/Agenda';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../../utils/baseUrl';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
function TherapistAccountScreen(props) {
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
    const user = await AsyncStorage.getItem('session');
    const session = JSON.parse(user);
    let config = {
      method: 'post',
      url: `${baseUrl}client_history`,
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
    <ScrollView contentContainerStyle={{marginTop: hp('10%')}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
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
              height: 120,
              width: 120,
              margin: 10,
              alignSelf: 'center',
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
          <View>
            <Text style={{color: '#000', fontWeight: 'bold'}}>Name:</Text>
            <Text style={{color: '#000', fontWeight: 'bold'}}>City:</Text>
            <Text style={{color: '#000', fontWeight: 'bold'}}>Email:</Text>
            <Text style={{color: '#000', fontWeight: 'bold'}}>Address:</Text>
          </View>
          <View>
            <Text style={{color: '#000'}}>{data.name}</Text>
            <Text style={{color: '#000'}}>{data.city}</Text>
            <Text style={{color: '#000'}}>{data.email}</Text>
            <Text style={{color: '#000'}}>{data.address} </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', margin: 10}}>
        <AppText style={{fontWeight: 'bold'}}>Booked Appointments</AppText>
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

export default TherapistAccountScreen;
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

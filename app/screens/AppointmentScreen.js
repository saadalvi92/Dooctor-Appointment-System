import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/Text';
import RatingStars from '../components/RatingStars';
import AppButton from '../components/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../utils/baseUrl';
function AppointmentScreen(props) {
  const data = props.route.params.data;
  const [appointment, setAppointment] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [BtnColor1, setBtnColor1] = useState('black');
  const [borderColor1, setBorderColor1] = useState('black');

  const [BtnColor2, setBtnColor2] = useState('black');
  const [borderColor2, setBorderColor2] = useState('black');

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data1 = await AsyncStorage.getItem('session');
    const userSession = JSON.parse(data1);
    let config = {
      method: 'get',
      url: `${baseUrl}get_doc/${data.id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: userSession.session_key,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        console.log('The response is here', response.data.data.users);
        setBookings(response.data.data.users.bookings);
        setUnavailable(response.data.data.users.get_unavilable_dates);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.profileCard}>
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
        <View
          style={{
            flex: 1,
            marginRight: '3%',
          }}>
          {data.image == null ? (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{height: hp('16%'), width: wp('27%'), borderRadius: 4}}
            />
          ) : (
            <Image
              source={{
                uri: `${imageUrl}${data.image}`,
              }}
              resizeMode="cover"
              style={{height: hp('13%'), width: wp('23%'), borderRadius: 4}}
            />
          )}
        </View>
        <View
          style={{
            flex: 3,
            marginLeft: '12%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            style={{
              color: colors.dark,
              fontSize: RFValue(16),
              fontWeight: 'bold',
              marginBottom: '5%',
            }}>
            {data.name}
          </AppText>
          <AppText
            style={{
              color: colors.textGray,
              fontSize: RFValue(14),
              marginBottom: '5%',
            }}>
            {data.designation}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <RatingStars number={data.rating} />
            <AppText
              style={{
                color: colors.textGray,
                fontSize: RFValue(14),
                textAlign: 'center',
              }}>
              ({data.reviews})
            </AppText>
          </View>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableHighlight
          underlayColor="#40AE49"
          style={{
            width: wp('90%'),
            height: hp('7%'),
            borderColor: '#40AE49',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderRadius: 4,
            textAlign: 'center',
            justifyContent: 'center',
          }}
          onPressIn={() => {
            setBtnColor1('white');
          }}
          onPressOut={() => {
            setBtnColor1('black');
          }}
          onPress={() => {
            setAppointment('Video Appointments');
            props.navigation.navigate('ScheduleCalendarScreen', {
              unavailable: unavailable,
              bookings: bookings,
              type: 'online',
              doc: data,
            });
          }}>
          <Text
            style={{
              color: BtnColor1,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Video Appointments
          </Text>
        </TouchableHighlight>
        {/* <AppButton
          title={'Video Appointments'}
          background={appointment === 'Video Appointments' ? true : false}
          borderWidth={2}
          borderColor={colors.green}
          textColor={appointment === 'Video Appointments' ? '#fff' : '#000'}
          fontWeight={'500'}
          onPress={() => {
            setAppointment('Video Appointments');
            props.navigation.navigate('ScheduleCalendarScreen', {
              unavailable: unavailable,
              bookings: bookings,
              type: 'online',
              doc: data,
            });
          }}
        /> */}

        <TouchableHighlight
          underlayColor="#40AE49"
          style={{
            width: wp('90%'),
            height: hp('7%'),
            borderColor: '#40AE49',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderRadius: 4,
            marginTop: '3%',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          onPressIn={() => {
            setBtnColor2('white');
          }}
          onPressOut={() => {
            setBtnColor2('black');
          }}
          onPress={() => {
            setAppointment('in person Appointments');
            props.navigation.navigate('ScheduleCalendarScreen', {
              unavailable: unavailable,
              bookings: bookings,
              type: 'clinic',
              doc: data,
            });
          }}>
          <Text
            style={{
              color: BtnColor2,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            In person Appointments
          </Text>
        </TouchableHighlight>
        {/* <AppButton
          title={'in person Appointments'}
          background={appointment === 'in person Appointments' ? true : false}
          borderWidth={2}
          borderColor={colors.green}
          textColor={appointment === 'in person Appointments' ? '#fff' : '#000'}
          fontWeight={'500'}
          onPress={() => {
            setAppointment('in person Appointments');
            props.navigation.navigate('ScheduleCalendarScreen', {
              unavailable: unavailable,
              bookings: bookings,
              type: 'clinic',
              doc: data,
            });
          }}
        /> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 3,
  },

  backContainer: {
    marginVertical: 25,
  },
  profileCard: {
    height: hp('17%'),
    flexDirection: 'row',
  },
});

export default AppointmentScreen;

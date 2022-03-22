import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/Text';
import RatingStars from '../components/RatingStars';
import AppButton from '../components/Button';
import moment from 'moment';
import ModalView from '../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../utils/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
function AppointmentDetails(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(props.route.params.user);
  const [session, setSession] = useState({});
  const [appointment, setAppointment] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [data, setData] = useState({});
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const detailUser = await AsyncStorage.getItem('user');
    const detailSession = await AsyncStorage.getItem('session');
    const userSession = JSON.parse(detailSession);
    setUser(JSON.parse(detailUser));
    setSession(userSession);
    let config = {
      method: 'get',
      url: `${baseUrl}get_doc/${props.route.params.data.doc_id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: userSession.session_key,
      },
    };
    axios(config)
      .then(response => {
        setCustomer(response.data.data.users);
        setLoading(false);
        setBookings(response.data.data.users.bookings);
        setUnavailable(response.data.data.users.get_unavilable_dates);
        setData({
          id: response.data.data.users.id,
          name: response.data.data.users.name,
          designation: response.data.data.users.type,
          image: response.data.data.users.image,
          fee: response.data.data.users.fee,
          distance: null,
          rating:
            response.data.data.users.avg_rating == null
              ? 5
              : response.data.data.users.avg_rating,
          reviews: response.data.data.users.rating_count,
          location: response.data.data.users.location,
          email: response.data.data.users.email,
          age: response.data.data.users.age,
          lng: response.data.data.users.lng,
          lat: response.data.data.users.lat,
        });
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const getDataAfter = async () => {
    setLoading(true);
    const detailUser = await AsyncStorage.getItem('user');
    const detailSession = await AsyncStorage.getItem('session');
    const userSession = JSON.parse(detailSession);
    setUser(JSON.parse(detailUser));
    setSession(userSession);
    let config = {
      method: 'get',
      url: `${baseUrl}get_doc/${props.route.params.data.doc_id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: userSession.session_key,
      },
    };
    axios(config)
      .then(response => {
        console.log(
          'The data is here for get_doc',
          response.data.data.users.image,
        );
        setLoading(false);
        setBookings(response.data.data.users.bookings);
        setUnavailable(response.data.data.users.get_unavilable_dates);
        setData({
          id: response.data.data.users.id,
          name: response.data.data.users.name,
          designation: response.data.data.users.type,
          image: response.data.data.users.image,
          fee: response.data.data.users.fee,
          distance: null,
          rating:
            response.data.data.users.avg_rating == null
              ? 5
              : response.data.data.users.avg_rating,
          reviews: response.data.data.users.rating_count,
          location: response.data.data.users.location,
          email: response.data.data.users.email,
          age: response.data.data.users.age,
          lng: response.data.data.users.lng,
          lat: response.data.data.users.lat,
        });
      })
      .then(() => {
        props.navigation.navigate('ScheduleCalendarScreen', {
          unavailable: unavailable,
          bookings: bookings,
          type: props.route.params.data.type,
          doc: data,
          details: props.route.params.data,
          today: moment(props.route.params.data.start_time).format(
            'YYYY-MM-DD',
          ),
        });
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const cancelAppointment = () => {
    setLoading(true);
    let config = {
      method: 'get',
      url: `${baseUrl}cancel_booking/${props.route.params.data.id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        console.log(response.data.data);
        setModalVisible(false);
        props.route.params.onPress();
        props.navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        alert(error.response.data.message);
      });
  };
  return (
    <Screen style={styles.container} details={true} top={true}>
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
      <ModalView
        title={'You want to cancel your appointment?'}
        onPressok={e => {
          console.log('ok is pressed', props.route.params.data.id);
          cancelAppointment();
        }}
        onPresscancel={e => {
          console.log('the cancel is pressed');
          setModalVisible(false);
        }}
        isModalVisible={modalVisible}
      />
      <View style={styles.profileCard}>
        <View
          style={{
            flex: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {user.type == 'client' ? (
            data?.image ? (
              <Image
                source={{uri: `${imageUrl}${data.image}`}}
                resizeMode="cover"
                style={{height: hp('13%'), width: wp('23%'), borderRadius: 20}}
              />
            ) : (
              <Image
                source={require('../assets/images/User.png')}
                resizeMode="cover"
                style={{height: hp('13%'), width: wp('23%'), borderRadius: 20}}
              />
            )
          ) : data?.image ? (
            <Image
              source={{uri: `${imageUrl}${data.image}`}}
              resizeMode="cover"
              style={{height: hp('12%'), width: wp('22%'), borderRadius: 8}}
            />
          ) : (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{height: hp('12%'), width: wp('22%'), borderRadius: 8}}
            />
          )}
        </View>
        <View
          style={{
            flex: 3,
            marginLeft: '3%',
            justifyContent: 'center',
          }}>
          {user.type == 'therapist' ? (
            <>
              <AppText
                style={{
                  color: '#1E1F20',
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                }}>
                {props.route.params.data.name}
              </AppText>
            </>
          ) : (
            <>
              <AppText
                style={{
                  color: '#1E1F20',
                  fontSize: RFValue(15),
                  fontWeight: '700',
                }}>
                {props.route.params.data.name}
              </AppText>
              <AppText style={{color: '#1E1F20', fontSize: RFValue(14)}}>
                {props.route.params.data.gender}
              </AppText>
              {props.route.params.color == 'video' ? null : (
                <AppText style={{color: '#1E1F20', fontSize: RFValue(14)}}>
                  Address: {props.route.params.data.location}
                </AppText>
              )}
            </>
          )}
        </View>
        {user.type == 'therapist' ? (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              console.log('Navigate to chat screen', data);
              props.navigation.navigate('ChatScreen', {
                currentChat: {
                  chatId: null,
                  chatImage: user.image,
                  chatName: user.name,
                  designation: data.designation,
                  id: data.id,
                  image: data.image,
                  message: '',
                  name: data.name,
                  senderId: user.id,
                },
              });
            }}>
            <Image
              source={require('../assets/images/messenger.png')}
              resizeMode="contain"
              style={{height: hp('10%'), width: wp('10%')}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {user.type == 'therapist' ? (
        <>
          <View
            style={[
              styles.detailCardTop,
              {
                backgroundColor:
                  props.route.params.color == 'video' ? '#DCEAF4' : '#fff',
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}>
              <AppText
                style={{
                  color: '#9393aa',
                  fontSize: RFValue(13),
                  fontWeight: '500',
                  flex: 2,
                  marginLeft: '4%',
                }}>
                Client Appointment History
              </AppText>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                onPress={() => {
                  console.log('Navigate false');
                  props.navigation.navigate('ScheduleCalendarScreen', {
                    unavailable: unavailable,
                    bookings: bookings,
                    type: props.route.params.data.type,
                    doc: data,
                    navigate: false,
                  });
                }}>
                <Text
                  style={{
                    color: '#9393aa',
                    fontSize: RFValue(13),
                    // fontWeight: '500',
                  }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: hp('15%'),
              width: widthPercentageToDP('87%'),
              backgroundColor:
                props.route.params.color == 'video' ? '#DCEAF4' : '#fff',
              borderRadius: 15,
              padding: 20,
              marginHorizontal: '3%',
            }}>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 4}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Client mood Calender');
                }}>
                <AppText
                  style={{
                    color: '#9393aa',
                    fontSize: RFValue(13),
                    fontWeight: '500',
                  }}>
                  Client Mood calender
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2%',
                }}
                onPress={() => {
                  props.navigation.navigate('MoodCalender', {
                    customer: customer,
                  });
                }}>
                <Image
                  source={require('../assets/images/CalendarTherapist.png')}
                  style={{marginRight: '2%'}}
                />
                <Text
                  style={{
                    color: '#304659',
                    fontSize: RFValue(16),
                    fontWeight: '400',
                    textDecorationLine: 'underline',
                  }}>
                  {moment(new Date()).format('DD MMM YYYY')}
                </Text>
                <Icon
                  name="chevron-down"
                  size={12}
                  color={colors.black}
                  style={{marginLeft: '2%'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: '3%', marginHorizontal: '3%'}}>
            <AppButton
              title={'Plan of Care'}
              background={false}
              borderWidth={1}
              borderColor={
                props.route.params.color == 'video'
                  ? colors.primary
                  : colors.green
              }
              textColor="#000"
              fontWeight={'bold'}
              onPress={() => {
                props.navigation.navigate('TherapistPlaneofCare');
              }}
            />
            <AppButton
              title={'Treatment Plan'}
              background={false}
              borderWidth={1}
              borderColor={
                props.route.params.color == 'video'
                  ? colors.primary
                  : colors.green
              }
              textColor="#000"
              fontWeight={'bold'}
              onPress={() => {
                console.log('The modal should be  visible');
                props.navigation.navigate('TreatmentPlane');
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={[
              styles.detailCard,
              {
                backgroundColor:
                  props.route.params.color == 'video' ? '#DCEAF4' : '#fff',
              },
            ]}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor:
                  props.route.params.color == 'video'
                    ? '#f6f6f6'
                    : colors.green,
                marginVertical: 10,
                paddingVertical: 10,
              }}
              onPress={() => {
                getDataAfter();
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '2%',
                }}>
                <Image
                  source={require('../assets/images/CallendarAppointment.png')}
                  style={{marginRight: '4%'}}
                />
                <AppText
                  style={{
                    color: colors.dark,
                    fontSize: RFValue(15),
                    fontWeight: '700',
                  }}>
                  Reschedule Appointment
                </AppText>
              </View>
            </TouchableOpacity>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 2}}>
              <AppText
                style={{
                  color: '#1E1F20',
                  fontSize: RFValue(15),
                  marginBottom: '2%',
                }}>
                {moment(props.route.params.data.start_time).format(
                  'dddd, MMMM Do YYYY',
                )}
              </AppText>

              <AppText style={{color: '#1E1F20', fontSize: RFValue(15)}}>
                {moment(props.route.params.data.start_time).format('hh:mm A')} -{' '}
                {moment(props.route.params.data.end_time).format('hh:mm A')}
              </AppText>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <AppButton
              title={'Cancel Appointments'}
              background={false}
              borderWidth={2}
              borderColor={
                props.route.params.color == 'video'
                  ? colors.primary
                  : colors.green
              }
              textColor="#304659"
              fontWeight={'bold'}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    paddingBottom: 3,
  },

  profileCard: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
  },
  detailCard: {
    height: hp('25%'),
    width: '100%',
    // backgroundColor: '#fff',

    borderRadius: 18,
    padding: 20,
    paddingHorizontal: 0,
  },
  detailCardTop: {
    height: '15%',
    width: '100%',
    borderRadius: 10,
    marginBottom: '5%',
    backgroundColor: '#fff',
    marginHorizontal: '3%',
    width: widthPercentageToDP('87%'),
  },
});

export default AppointmentDetails;

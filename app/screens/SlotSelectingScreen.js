import React, {useState} from 'react';
import AppText from '../components/Text';
import colors from '../config/colors';
import RatingStars from '../components/RatingStars';
import Screen from '../components/Screen';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppButton from '../components/Button';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../utils/baseUrl';
function SlotSelectingScreen(props) {
  const {doc, slot, type, uncheckedslots} = props.route.params;
  const [loading, setLoading] = useState(false);
  const price = 100 * slot.length - uncheckedslots.length * 100;
  const booking = async () => {
    setLoading(true);
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const user = JSON.parse(data);
    const userSession = JSON.parse(data1);
    var newSlots = slot;
    if (uncheckedslots.length == 0) {
      newSlots.map((newSlot, index) => {
        var firstOrder = newSlot.hour.slice(0, 2) * 1;
        var secondOrder = newSlot.hour.slice(3, 5);
        if (secondOrder == '30') {
          if (firstOrder < 9) {
            firstOrder = `0${firstOrder + 1}`;
            secondOrder = '00';
          } else {
            firstOrder = firstOrder + 1;
            secondOrder = '00';
          }
        } else {
          secondOrder = '30';
        }
        secondOrder = firstOrder == 24 ? '59' : secondOrder;
        firstOrder = firstOrder == 24 ? '23' : firstOrder;
        const EndTime = newSlot.date + ' ' + `${firstOrder}:${secondOrder}`;
        const startTime = newSlot.date + ' ' + newSlot.hour;
        console.log('The data is here', {
          doc_id: doc.id,
          start_time: startTime,
          end_time: EndTime,
          type: type,
          amount: 100,
        });
        let config = {
          method: 'post',
          url: `${baseUrl}add_booking`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: userSession.session_key,
          },
          data: {
            doc_id: doc.id,
            start_time: startTime,
            end_time: EndTime,
            type: type,
            amount: 100,
          },
        };
        axios(config)
          .then(response => {
            setLoading(false);
            // props.navigation.navigate('PaymentPage', {
            //   data: response.data.data,
            // });
            console.log('the response is 1');
            if (newSlots.length - 1 == index) {
              setLoading(false);
              Alert.alert('Success', 'Booking Successful', [
                {
                  text: 'OK',
                  onPress: () =>
                    props.navigation.navigate('Appointments', {
                      screen: 'TopTabNavigationAppointments',
                    }),
                },
              ]);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error.response.data);
            if (newSlots.length == index) alert('SomeThing went wrong');
          });
      });
    } else
      await uncheckedslots.map((resetbooking, index) => {
        var firstOrder = newSlots[index].hour.slice(0, 2) * 1;
        var secondOrder = newSlots[index].hour.slice(3, 5);
        if (secondOrder == '30') {
          if (firstOrder < 9) {
            firstOrder = `0${firstOrder + 1}`;
            secondOrder = '00';
          } else {
            firstOrder = firstOrder + 1;
            secondOrder = '00';
          }
        } else {
          secondOrder = '30';
        }
        const EndTime =
          newSlots[index].date + ' ' + `${firstOrder}:${secondOrder}`;
        const startTime = newSlots[index].date + ' ' + newSlots[index].hour;
        const data = {
          appointment_id: resetbooking.id,
          start_time: startTime,
          end_time: EndTime,
        };
        console.log('the data is in unchecked', data, 'iteration is', index);
        let config = {
          method: 'post',
          url: `${baseUrl}reschedule_booking`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: userSession.session_key,
          },
          data: data,
        };
        axios(config)
          .then(response => {
            if (index == uncheckedslots.length - 1) {
              newSlots.splice(0, uncheckedslots.length);
              console.log('the new slots are', newSlots);
              if (newSlots.length == 0) {
                props.navigation.dispatch(StackActions.popToTop());
                setLoading(false);
              } else {
                newSlots.map((newSlot, slot_index) => {
                  var firstOrder = newSlot.hour.slice(0, 2) * 1;
                  var secondOrder = newSlot.hour.slice(3, 5);
                  if (secondOrder == '30') {
                    if (firstOrder < 9) {
                      firstOrder = `0${firstOrder + 1}`;
                      secondOrder = '00';
                    } else {
                      firstOrder = firstOrder + 1;
                      secondOrder = '00';
                    }
                  } else {
                    secondOrder = '30';
                  }
                  const EndTime =
                    newSlot.date + ' ' + `${firstOrder}:${secondOrder}`;
                  const startTime = newSlot.date + ' ' + newSlot.hour;
                  console.log(
                    'the data is in new slots map',
                    {
                      doc_id: doc.id,
                      start_time: startTime,
                      end_time: EndTime,
                      type: type,
                      amount: 100,
                    },
                    'the iteration is ',
                    slot_index,
                  );
                  let config = {
                    method: 'post',
                    url: `${baseUrl}add_booking`,
                    headers: {
                      app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
                      session_token: userSession.session_key,
                    },
                    data: {
                      doc_id: doc.id,
                      start_time: startTime,
                      end_time: EndTime,
                      type: type,
                      amount: 100,
                    },
                  };
                  axios(config)
                    .then(response => {
                      if (slot_index == newSlots.length - 1) {
                        setLoading(false);
                        Alert.alert('Success', 'Booking Successful', [
                          {
                            text: 'OK',
                            onPress: () => props.navigation.popToTop(),
                          },
                        ]);
                      }
                    })
                    .catch(error => {
                      setLoading(false);
                      console.log(error.response.data);
                    });
                });
              }
            }
          })

          .catch(error => {
            console.log(error);
          });
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
          {doc.image == null ? (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{height: hp('16%'), width: wp('27%'), borderRadius: 4}}
            />
          ) : (
            <Image
              source={{
                uri: `${imageUrl}${doc.image}`,
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
            {doc.name}
          </AppText>
          <AppText
            style={{
              color: colors.textGray,
              fontSize: RFValue(14),
              marginBottom: '5%',
            }}>
            {doc.designation}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <RatingStars number={doc.rating} />
            <AppText
              style={{
                color: colors.textGray,
                fontSize: RFValue(14),
                textAlign: 'center',
              }}>
              ({doc.reviews})
            </AppText>
          </View>
        </View>
      </View>

      <View
        style={{
          width: wp('90%'),
          justifyContent: 'flex-end',
          flex: 1,
          alignContent: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: RFValue(24),
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Cost:${price}
        </Text>
        <AppButton
          title="Book Now"
          onPress={() => {
            booking();
            // console.log('the booked unchecked slots are ', uncheckedslots);
            // console.log('The new slots are', slot);
          }}
        />
      </View>
    </Screen>
  );
}

export default SlotSelectingScreen;
const styles = StyleSheet.create({
  profileCard: {
    height: hp('20%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    marginLeft: '3%',
  },
});

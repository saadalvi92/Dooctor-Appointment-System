import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import NotificationCard from '../components/NotificationCard';
import AppText from '../components/Text';
import colors from '../config/colors';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Screen from '../components/Screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../utils/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';

// [
//   {
//     type: 'Appointment',
//     message: 'You have an appointment with sarah connor at 08:00 pm today.',
//     time: 'Just now',
//     icon: require('../assets/images/CalendarNotification.png'),
//     backgroundColor: '#707070',
//   },
//   {
//     type: 'Profile',
//     message: 'You have an appointment with sarah connor at 08:00 pm today.',
//     time: 'Complete profile >',
//     icon: require('../assets/images/ProfileUnActive.png'),
//     backgroundColor: '#fff',
//   },
//   {
//     type: 'Bank',
//     message: 'You have an appointment with sarah connor at 08:00 pm today.',
//     time: 'Add Now >',
//     icon: require('../assets/images/Payment.png'),
//     backgroundColor: '#fff',
//   },
// ]
function NotificationScreen(props) {
  const [modal, setModal] = useState(false);
  var [data, setData] = useState();
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [selectedRequest, setSelectedRequest] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const dataUser = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const detailUser = JSON.parse(dataUser);
    const detailSession = JSON.parse(data1);
    setUser(detailUser);
    setSession(detailSession);
    let newDataFirst = [];
    let config = {
      method: 'get',
      url: `${baseUrl}notifications`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: detailSession.session_key,
      },
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data.data.notifications));
        const newARR = response.data.data.notifications;
        newARR.map(item => {
          newDataFirst.push({
            id: item.id,
            message: item.notification_text,
            type: item.type,
            sender: item.sender,
            time:
              new Date().getSeconds() -
                new Date(item.created_at).getSeconds() <=
              5
                ? 'Just Now'
                : moment(item.created_at).format('YYYY-MM-DD hh:mm A'),
            icon:
              item.type == 'payment'
                ? require('../assets/images/Payment.png')
                : item.type == 'requested' ||
                  item.type == 'request_approved' ||
                  item.type == 'request_denied'
                ? require('../assets/images/ProfileUnActive.png')
                : item.type == 'booking' || item.type == 'upcoming_appointment'
                ? require('../assets/images/CalendarNotification.png')
                : null,
            backgroundColor:
              item.type == 'requested'
                ? colors.green
                : item.type == 'request_approved'
                ? '#707070'
                : item.type == 'request_denied'
                ? colors.danger
                : item.type == 'payment'
                ? '#707070'
                : item.type == 'booking'
                ? colors.dark
                : item.type == 'upcoming_appointment'
                ? colors.green
                : null,
          });
        });
      })
      .then(() => {
        let config = {
          method: 'get',
          url: `${baseUrl}get_requests`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: detailSession.session_key,
          },
        };

        axios(config)
          .then(response => {
            console.log('The response is here', response.data.data.requests);
            const newData = response.data.data.requests.map((item, index) => {
              const time = new Date(item.created_at).getTime();
              const upperLimit = new Date(Date.now()).getTime() + 20000;
              const lowerLimit = new Date(Date.now()).getTime() - 20000;
              return {
                type: 'requested',
                message: `You have an Add Request from ${item.clinic.name}'s Clinic`,
                time:
                  time >= upperLimit || time <= lowerLimit
                    ? 'Just now'
                    : moment(item.created_at).format('hh:mm A'),
                icon: require('../assets/images/CalendarNotification.png'),
                clinic: item.clinic,
                req_id: item.id,
                backgroundColor: colors.green,
              };
            });
            setLoading(false);
            console.log('The new Dataa is as follows', newData);
            const addedData = [...newData, ...newDataFirst];
            setData(addedData);
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const acceptanddeny = number => {
    let config = {
      method: 'post',
      url: `${baseUrl}approve_reject_booking`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {
        request_id: selectedRequest.req_id,
        is_accepted: number,
      },
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        getData();
        setModal(false);
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data.message);
        setModal(false);
      });
  };
  return (
    <Screen top={true}>
      <View style={{flex: 1, margin: 30, marginTop: 15}}>
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
        <View>
          <Modal
            isVisible={modal}
            onBackdropPress={() => {
              setModal(false);
            }}>
            <View
              style={{
                backgroundColor: '#ccc',
                height: '28%',
                width: '95%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  marginBottom: '5%',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                Approve Request
              </Text>
              <View
                style={{flexDirection: 'row', width: '100%', marginTop: '5%'}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60%',
                    marginLeft: '2%',
                    marginRight: '2%',
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    acceptanddeny(1);
                  }}>
                  <Text style={{fontSize: 20, color: '#fff'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60%',
                    marginLeft: '2%',
                    marginRight: '2%',
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    acceptanddeny(2);
                  }}>
                  <Text style={{fontSize: 20, color: '#fff'}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <FlatList
          style={styles.description}
          ListHeaderComponent={() => (
            <AppText
              style={{
                fontSize: RFValue(24),
                fontWeight: '700',
                color: colors.primary,
                marginBottom: 20,
              }}>
              Notifications
            </AppText>
          )}
          data={data}
          key={item => {
            item.index;
          }}
          renderItem={({item}) => (
            <NotificationCard
              goto={() => {
                console.log('the item is', item);
                setSelectedRequest(item);
                if (item.type == 'requested') {
                  setModal(true);
                }
              }}
              details={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </Screen>
  );
}

export default NotificationScreen;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

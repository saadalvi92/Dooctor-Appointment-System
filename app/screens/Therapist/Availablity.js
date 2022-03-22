import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
} from 'react-native';
import Screen from '../../components/Screen';
import NotAvailableCard from '../../components/NotAvailableCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../config/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../../utils/baseUrl';
function Availablity({navigation}) {
  const [session, setSession] = useState({});
  const [notAvailableDetails, setNotAvailableDetails] = useState([]);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [previousData, setPreviousData] = useState([]);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    ShowLoading();
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const userdata = JSON.parse(data);
    const userSession = JSON.parse(data1);
    setUser(userdata);
    setSession(userSession);
    var config = {
      method: 'get',
      url: `${baseUrl}get_unavailable_days`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: userSession.session_key,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(
          'the response from the api is here',
          response.data.data.days,
        );
        setNotAvailableDetails(response.data.data.days);
        setPreviousData(response.data.data.days);
        HideLoading();
      })
      .catch(error => {
        HideLoading();
        console.log('The error is here', error.response.data);
      });
  };
  const setUnavailabilty = () => {
    ShowLoading();
    notAvailableDetails.map((item, index) => {
      if (item.id == undefined) {
        var config = {
          method: 'post',
          url: `${baseUrl}add_unavilable`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: session.session_key,
          },
          data: {
            day: item.day,
            from: item.from,
            to: item.to,
            reason: item.reason,
          },
        };
        axios(config)
          .then(function (response) {
            console.log(
              'the response from the api is here',
              response.data.data,
            );
            setRefresh(!refresh);
            if (notAvailableDetails - 1 == index) {
              HideLoading();
            }
          })
          .catch(error => {
            console.log('The error is here', error.response.data);
            if (notAvailableDetails - 1 == index) {
              HideLoading();
            }
          });
      }
    });
  };
  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView style={{paddingTop: 10}} showsVerticalScrollIndicator={false}>
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
          <Text
            style={{fontSize: RFValue(24), fontWeight: '400', color: '#000'}}>
            Select Appointment Slot
          </Text>
          <Text
            style={{fontSize: RFValue(24), fontWeight: '400', color: '#000'}}>
            and Duration
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setNotAvailableDetails([...notAvailableDetails, {}]);
            }}
            style={{marginRight: '5%'}}>
            <Image source={require('../../assets/images/Add.png')} />
          </TouchableOpacity>
        </View>
        {notAvailableDetails.map((item, index) => {
          return (
            <NotAvailableCard
              setState={setNotAvailableDetails}
              state={notAvailableDetails}
              index={index}
              item={item}
              Refresh={() => {
                setRefresh(!refresh);
              }}
              session={session}
            />
          );
        })}
        {notAvailableDetails.length != 0 ? (
          <View style={{flex: 1, marginVertical: '8%'}}>
            <AppButton
              title="Save"
              onPress={() => {
                var empty = 0;
                notAvailableDetails.map((item, index) => {
                  if (
                    item.from == undefined ||
                    item.to == undefined ||
                    item.day == undefined
                  ) {
                    empty = empty + 1;
                  }
                  if (notAvailableDetails.length - 1 == index) {
                    if (empty == 0) {
                      setUnavailabilty();
                    } else {
                      console.log(empty);
                      alert('Some of the required filds are empty');
                    }
                  }
                });
              }}
            />
          </View>
        ) : null}
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
  header_text: {
    width: '58%',
  },
  bell_container: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 7,
  },
  bell_icon: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff',
  },
});

export default Availablity;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioButtonRN from 'radio-buttons-react-native';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
const DATA = [
  {id: 1, label: 'Client'},
  {id: 2, label: 'Therapist'},
  {id: 3, label: 'Practice'},
];
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../utils/baseUrl';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import OneSignal from 'react-native-onesignal';
function SelectionOfUserScreen({navigation, route}) {
  const [userType, setUserType] = useState(DATA[1]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
            console.log('====>', res);
            check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(response => {
              response == 'granted'
                ? console.log('granted')
                : alert(
                    "If you dont enable location we can't find the Therapists in your for you",
                  );
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  const getData = async () => {
    setLoading(true);
    const stringCreds = await AsyncStorage.getItem('creds');
    const creds = JSON.parse(stringCreds);
    console.log('creds are as follows', creds);
    if (creds != null) {
      setLoading(true);
      var config = {
        method: 'post',
        url: `${baseUrl}login`,
        headers: {
          app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        },
        data: {
          email: creds.email,
          password: creds.password,
        },
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          if (response.data.status == 'success')
            console.log('The user is', response.data.data.user);
          OneSignal.sendTag(
            'user_id',
            JSON.stringify(response.data.data.user.id),
          );
          OneSignal.sendTag(
            'user_type',
            JSON.stringify(response.data.data.user.type),
          );
          AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
          AsyncStorage.setItem(
            'session',
            JSON.stringify(response.data.data.session),
          );
          route.params.setUser({
            ...response.data.data.user,
            state: null,
            province: response.data.data?.user?.state,
          });
        })
        .then(() => {
          // console.log('the user is', route.params);
          route.params.setState(true);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <Screen style={styles.container}>
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
      <View style={{width: '100%', flex: 1, justifyContent: 'space-evenly'}}>
        <RadioButtonRN
          boxStyle={{
            flexDirection: 'row-reverse',
            paddingVertical: 20,
            backgroundColor: 'transparent',
          }}
          activeColor={colors.green}
          deactiveColor={'#a4c8d5'}
          textStyle={{justifyContent: 'flex-end', fontSize: 16}}
          data={DATA}
          initial={1}
          selectedBtn={e => setUserType(e)}
          circleSize={18}
          icon={
            <MaterialCommunityIcons
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 50,
              }}
              name="check"
              size={22}
              color={colors.primary}
            />
          }
        />
      </View>
      <TouchableOpacity
        style={{
          flex: 0.25,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          // backgroundColor: '#000',
        }}
        onPress={() => navigation.navigate('LoginOrSignUpScreen', {userType})}>
        <AppText
          style={{
            color: colors.dark,
            fontSize: 16,
            textDecorationLine: 'underline',
          }}>
          Continue
        </AppText>
        <MaterialCommunityIcons
          name="arrow-right"
          size={16}
          color={colors.dark}
        />
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: '2%', paddingBottom: 3},
});

export default SelectionOfUserScreen;

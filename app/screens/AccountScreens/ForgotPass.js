import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppFormField from '../../components/forms/FormField';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Screen from '../../components/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../../utils/baseUrl';
import {values} from 'lodash';
function LoginScreen({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('This Field is required')
      .min(8)
      .label('newPassword'),
    newReenterPassword: Yup.string()
      .required('This Field is required')
      .min(8)
      .label('newReenterPassword')
      .matches(password, 'Password must Match'),
  });
  const forgotPassword = () => {
    setLoading(true);
    let config = {
      method: 'post',
      url: `${baseUrl}update_password`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
      },
      data: {password: password, user_id: route.params.id},
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        navigation.navigate('SuccessfulPasswordChangeScreen', {
          data: route.params.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Screen style={styles.container} top={true}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
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
            flex: 9.5,
            justifyContent: 'center',
          }}>
          <Formik
            initialValues={{newPassword: '', newReenterPassword: ''}}
            onSubmit={values => {
              console.log('values are', values);
              forgotPassword(values);
            }}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
              <>
                <Text style={styles.text}>Enter New Password</Text>
                <AppFormField
                  name="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  onBlur={() => setFieldTouched('newPassword')}
                  onChangeText={handleChange('newPassword')}
                  onChange={event => {
                    const {eventCount, target, text} = event.nativeEvent;
                    setPassword(text);
                  }}
                  textContentType="password"
                  eye
                  styles={styles.AppTextInput}
                  width={wp('85%')}
                />
                <Text style={styles.text}>Re Enter Password</Text>
                <AppFormField
                  name="newReenterPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  onBlur={() => setFieldTouched('newReenterPassword')}
                  onChangeText={handleChange('newReenterPassword')}
                  textContentType="password"
                  eye
                  styles={styles.AppTextInput}
                  width={wp('85%')}
                />
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: wp('85%'),
                      height: hp('7%'),
                      backgroundColor: '#40AE49',
                      borderRadius: 4,
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginTop: '2%',
                      marginBottom: '10%',
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View
          style={{
            flex: 1 / 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '10%',
          }}>
          <Text style={{fontSize: RFValue(16), color: '#000'}}>
            Don't have an account?{' '}
            <AppText
              onPress={() =>
                navigation.navigate('SignUpScreen', {data: route.params.data})
              }
              style={{
                color: colors.black,
                fontSize: RFValue(16),
                fontWeight: 'bold',
              }}>
              Sign Up
            </AppText>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  AppTextInput: {
    borderWidth: 1,
    borderColor: '#949494',
    flexDirection: 'row',
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#A4C8D5',
    alignSelf: 'center',
  },
  text: {
    fontSize: RFValue(16),
    fontWeight: '600',
    marginBottom: '1%',
    marginLeft: '6%',
  },
});

export default LoginScreen;

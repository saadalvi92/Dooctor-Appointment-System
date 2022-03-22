import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../../components/Button';
import AppFormField from '../../components/forms/FormField';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Screen from '../../components/Screen';
import {baseUrl} from '../../utils/baseUrl';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import OneSignal from 'react-native-onesignal';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({navigation, route}) {
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(email) === false) {
      setValidEmail(false);
      return false;
    }
    setValidEmail(true);
    return true;
  };
  const LoginFunction = values => {
    setLoading(true);
    var config = {
      method: 'post',
      // url: 'http://3.18.236.184/theralign/api/v1/login',
      url: `${baseUrl}login`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
      },
      data: {
        email: values.email,
        password: values.password,
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        if (response.data.status == 'success')
          console.log('The user is', response.data.data.user);
        console.log('The user is', response.data.data.session);
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
        AsyncStorage.setItem(
          'creds',
          JSON.stringify({email: values.email, password: values.password}),
        );
        route.params.setUser({
          ...response.data.data.user,
          state: null,
          province: response.data.data?.user?.state,
        });
      })
      .then(() => {
        // console.log('route', route.params.setState(true));
        route.params.setState(true);
      })
      .catch(function (error) {
        setLoading(false);

        if (error.response.data.message != '') {
          alert(error.response.data.message);
        } else {
          alert('Wrong Email or Password');
        }
        console.log(error.response.data);
      });
  };
  const forgotPassword = () => {
    navigation.navigate('ForgotPassEmail', {
      data: route.params.data,
    });
  };
  return (
    <Screen style={styles.container}>
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
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              console.log('The values are here', values);
              LoginFunction(values);
            }}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
              <>
                <Text style={styles.text}>Email</Text>
                <AppFormField
                  name="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  // placeholder="email"
                  textContentType="emailAddress"
                  onChangeText={text => {
                    validateEmail(text);
                    setFieldValue('email', text);
                    setEmail(text);
                  }}
                  validEmail={validEmail}
                  styles={styles.AppTextInput}
                  width={wp('85%')}
                />
                <Text style={styles.text}>Password</Text>
                <AppFormField
                  name="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  // placeholder="password"
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
                    onPress={handleSubmit}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <AppText
            onPress={() => {
              forgotPassword();
            }}
            style={{
              textDecorationLine: 'underline',
              textAlign: 'center',
              fontSize: RFValue(13),
              color: '#000',
            }}>
            Forgot Password?
          </AppText>
        </View>

        <View
          style={{
            flex: 1 / 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '10%',
          }}>
          <Text style={{fontSize: RFValue('16'), color: '#000'}}>
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
    borderColor: '#a4c8d5',
    flexDirection: 'row',
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#A4C8D5',
    alignSelf: 'center',
  },
  text: {
    fontSize: RFValue(14),
    fontWeight: '600',
    marginBottom: '1%',
    marginLeft: '6%',
  },
});

export default LoginScreen;

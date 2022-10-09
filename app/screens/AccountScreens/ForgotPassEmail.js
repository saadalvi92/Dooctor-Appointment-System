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
const validationSchema = Yup.object().shape({
  Email: Yup.string().required('Email must be Valid').email(),
});

function LoginScreen({navigation, route}) {
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();

  const validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(email) === false) {
      setValidEmail(false);
      return false;
    }
    setValidEmail(true);
    return true;
  };
  const sendEmail = values => {
    let config = {
      method: 'post',
      url: `${baseUrl}resend_verification`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
      },
      data: {email: values.Email},
    };
    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data.data));
        navigation.navigate('OTP', {
          id: response.data.data.user.id,
          OTP: response.data.data.code,
          email: values.Email,
          data: route.params.data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data.message);
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
            initialValues={{Email: ''}}
            onSubmit={values => {
              sendEmail(values);
            }}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
              <>
                <Text style={styles.text}>Email</Text>
                <AppFormField
                  name="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('Email')}
                  onChangeText={handleChange('Email')}
                  keyboardType="email-address"
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
                      Send OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
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

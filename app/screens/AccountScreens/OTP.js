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
  OTP: Yup.number().required('This Field is required'),
});

function LoginScreen({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const VerifyOTP = values => {
    console.log('The values are', values);
    console.log('The code is', route.params.OTP);
    if (values.OTP == route.params.OTP) {
      navigation.navigate('ForgotPass', {
        id: route.params.id,
        email: route.params.email,
        data: route.params.data,
      });
    } else {
      alert('Incorrect OTP');
    }
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
            initialValues={{OTP: ''}}
            onSubmit={values => {
              VerifyOTP(values);
            }}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
              <>
                <Text style={styles.text}>OTP</Text>
                <AppFormField
                  name="OTP"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('OTP')}
                  keyboardType="decimal-pad"
                  onChangeText={handleChange('OTP')}
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
                      Submit
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

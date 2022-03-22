import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/Text';
import PhoneInput from 'react-native-phone-number-input';
import {fontSize} from '../../config/fonts';
import colors from '../../config/colors';
import AppButton from '../../components/Button';
import {Formik} from 'formik';
import AppFormField from '../../components/forms/FormField';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DropDownField from '../../components/forms/DropDownField';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../../utils/baseUrl';
import GetLocation from 'react-native-get-location';
import ImagePicker from 'react-native-image-crop-picker';

function InformationScreen({navigation: {navigate, goBack}, route}) {
  const user = route.params.user;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [age, setAge] = useState();
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('31.123123');
  const [lng, setLng] = useState('72.123');
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(async location => {
      console.log(location, '=========================>');
      setLat(location.latitude);
      setLng(location.longitude);
    });
  };
  const onChange = (event, selectedDate) => {
    console.log('SelectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const updateProfile = values => {
    if (name == '') {
      alert('Name is missing');
    } else if (age == '') {
      alert('Age is missing');
    } else if (address == '') {
      alert('Address is missing');
    } else if (occupation == '') {
      alert('Occupation is missing');
    } else if (gender == '' || gender == 'Select Gender') {
      alert('Gender is missing');
    } else if (phoneNumber == '') {
      alert('Phone Number is missing');
    } else {
      ShowLoading();

      var config = {
        method: 'post',
        url: `${baseUrl}update_profile_client`,
        headers: {
          app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
          session_token: route.params.data.session_key,
        },
        data: {
          name: name,
          dob: moment(date).format('YYYY-MM-DD'),
          age: age,
          location: address,
          occupation: occupation,
          gender: gender,
          phone_code: formatedPhoneNumber.replace(phoneNumber, ''),
          phone: phoneNumber,
          lng: lng,
          lat: lat,
          image: image.uri,
        },
      };

      axios(config)
        .then(function (response) {
          if (response.status == 200) {
            HideLoading();
            navigate('LoginScreen');
          }
        })
        .catch(function (error) {
          HideLoading();
          setError(error.response.data.message);
          console.log(error.response.data.message);
          alert(error.response.data.message);
        });
    }
  };
  const updateImage = (Image, type) => {
    setLoading(true);
    var data = new FormData();
    data.append('file', {
      uri: Image,
      name: 'chat.jpg',
      type: type,
    });
    console.log('the data is here', data);
    let config = {
      method: 'post',
      url: `http://3.18.236.184/theralign/api/v1/file_upload`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: route.params.data.session_key,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log('hjaskjdhaskjnhdk', response.data.data.file_path);
        setImage({
          uri: `${response.data.data.file_path}`,
        });
      })
      .catch(function (error) {
        setLoading(false);
        console.log('Eroror----------------------->', error?.response?.data);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Screen style={styles.container} top={true}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
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
        <View style={{flex: 2, justifyContent: 'center'}}>
          <View>
            {/* <AppText style={{paddingBottom: 20}}>Step 1 of 1</AppText> */}
            <AppText
              style={{
                fontSize: fontSize.h4,
                fontWeight: '700',
                color: colors.primary,
              }}>
              Your information will be
            </AppText>
            <AppText
              style={{
                fontSize: fontSize.h4,
                fontWeight: '700',
                color: colors.primary,
                paddingBottom: 5,
              }}>
              shared with your therapist
            </AppText>
          </View>
        </View>
        {image.uri ? (
          <Image
            style={{
              height: hp('22%'),
              width: wp('37.5%'),
              margin: 10,
              alignSelf: 'center',
              borderRadius: 4,
            }}
            source={{uri: `${imageUrl}${image.uri}`}}
          />
        ) : (
          <Image
            style={{
              height: hp('22%'),
              width: wp('37.5%'),
              margin: 10,
              alignSelf: 'center',
              borderRadius: 4,
            }}
            source={require('../../assets/images/User.png')}
          />
        )}
        <TouchableHighlight
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
              updateImage(image.path, image.mime);
            });
          }}
          style={{
            width: '65%',
            height: '5%',
            backgroundColor: colors.green,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: '5%',
          }}>
          <Text
            style={{
              fontSize: RFValue(13),
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Upload Your Profile Picture
          </Text>
        </TouchableHighlight>
        <View style={{flex: 8}}>
          <>
            <Formik
              initialValues={{name: '', Address: ''}}
              onSubmit={values => {
                updateProfile(values);
              }}>
              {({handleChange, handleSubmit, setFieldTouched}) => (
                <>
                  <Text style={[styles.text]}>Full Name</Text>
                  <AppFormField
                    name="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="contacts"
                    textContentType="name"
                    value={name}
                    onChangeText={text => {
                      setName(text);
                    }}
                    styles={styles.AppTextInput}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={[styles.text]}>Date of birth</Text>
                      <TouchableOpacity
                        onPress={() => {
                          showDatepicker();
                        }}
                        style={styles.searchSection}>
                        <Image
                          source={require('../../assets/images/Calendarr.png')}
                          style={{marginLeft: 10}}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Date of birth"
                          value={moment(date).format('DD/MM/YYYY')}
                          editable={false}
                          underlineColorAndroid="transparent"
                          onChangeText={text => {
                            setDOB(text);
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={[styles.text]}>Age</Text>
                      <View style={styles.searchSection}>
                        <TextInput
                          style={styles.input}
                          value={age}
                          keyboardType="number-pad"
                          onChangeText={txt => {
                            setAge(txt);
                          }}
                          underlineColorAndroid="transparent"
                        />
                      </View>
                    </View>
                  </View>

                  <Text style={[styles.text]}>Address</Text>
                  <AppFormField
                    name="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched('Address')}
                    onChangeText={text => {
                      setAddress(text);
                    }}
                    // placeholder="Address"
                    styles={styles.AppTextInput}
                    Address={true}
                  />
                  <Text style={[styles.text]}>Occupation</Text>

                  <AppFormField
                    name="Occupation"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched('Occupation')}
                    onChangeText={text => {
                      setOccupation(text);
                    }}
                    styles={styles.AppTextInput}
                  />
                  <Text style={[styles.text]}>Gender</Text>
                  <DropDownField
                    data={['Select Gender', 'Male', 'Female', 'Others']}
                    Select={e => {
                      setGender(e);
                    }}
                  />
                  <Text style={[styles.text]}>Phone Number</Text>
                  <PhoneInput
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: '#A4C8D5',
                      flex: 1,
                      width: '100%',
                      height: hp('8%'),
                    }}
                    textInputStyle={{
                      fontSize: RFValue(18),
                      padding: 0,
                      margin: 0,
                      textAlignVertical: 'center',
                    }}
                    textContainerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: '#A4C8D5',
                      marginLeft: '8%',
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    codeTextStyle={{
                      fontSize: RFValue(16),
                      padding: 0,
                      margin: 0,
                    }}
                    countryPickerButtonStyle={{
                      borderColor: '#A4C8D5',
                      borderRadius: 8,
                      borderWidth: 1,
                      fontSize: RFValue(18),
                    }}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    onChangeText={text => {
                      console.log('The number is ', text);
                      console.log('The type is ', typeof text);
                      setPhoneNumber(text);
                    }}
                    onChangeFormattedText={text => {
                      setFormatedPhoneNumber(text);
                    }}
                    withDarkTheme={false}
                    withShadow={false}
                  />
                  <View style={{marginTop: '5%'}}>
                    <AppButton
                      title="Add Payment Details"
                      onPress={() => {
                        console.log('Add Payment Methods');
                      }}
                      arrowIcon
                    />
                    <AppButton
                      title="Save & Continue"
                      onPress={() => {
                        updateProfile();
                      }}
                      background={false}
                      color={'primary'}
                    />
                  </View>
                </>
              )}
            </Formik>
          </>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#424242',
  },
  container: {flex: 1, padding: 10, paddingBottom: '5%'},

  AppTextInput: {
    borderWidth: 1,
    borderColor: '#A4C8D5',
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#A4C8D5',
    paddingVertical: '0.8%',
  },
  text: {fontSize: 13, fontWeight: '600', marginBottom: '1%'},
});

export default InformationScreen;

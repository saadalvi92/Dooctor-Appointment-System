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
  Platform,
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
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import DropDownField from '../../components/forms/DropDownField';
import FontFiveIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../../utils/baseUrl';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});
import GetLocation from 'react-native-get-location';
import ImagePicker from 'react-native-image-crop-picker';
function TherapistProfile({navigation: {navigate, goBack}, route}) {
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [age, setAge] = useState();
  const [address, setAddress] = useState('');
  const [credentials, setCredentials] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [city, setCity] = useState('');
  const [stat, setStat] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [practice, setPractice] = useState('');
  const [license, setLicense] = useState({});
  const [malPractice, setMalPractice] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState('');
  const [image, setImage] = useState({});
  const [session, setSession] = useState('');
  const [lat, setLat] = useState('31.123123');
  const [lng, setLng] = useState('72.123');
  const [fee, setFee] = useState('100');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  useEffect(() => {
    getData();
  }, [refresh]);
  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
  };
  const getData = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        console.log(location, '=========================>');
        setLat(location.latitude);
        setLng(location.longitude);
      })
      .catch(err => {
        console.log(err);
      });
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    console.log('The session is', data1);
    const user = JSON.parse(data);
    setSession(JSON.parse(data1));
    ShowLoading();
    const session1 = JSON.parse(data1);
    var config = {
      method: 'get',
      url: `${baseUrl}get_user_profile/${user.id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session1.session_key,
      },
    };
    axios(config)
      .then(function (response) {
        HideLoading();
        console.log('response==>', response.data.data.user);
        setBio(response.data.data.user.bio);

        setName(response.data.data.user.name);
        setEmail(response.data.data.user.email);
        setDesignation(response.data.data.user.designation);
        setCity(response.data.data.user.city);
        setStat(response.data.data.user.state);
        setZipCode(response.data.data.user.zip_code);

        setLicense(response.data.data.user.license);
        setMalPractice(response.data.data.user.insurance);
        setAddress(response.data.data.user.location);
        setZipCode(`${response.data.data.user.zip_code}`);
        setPhoneNumber(response.data.data.user.phone);
        if (response.data.data.user.image != null) {
          setImage({
            uri: `${response.data.data.user.image}`,
          });
        }
        setCredentials(JSON.stringify(response.data.data.user.credentials));
        setFee(JSON.stringify(response.data.data.user.fee));
        setGender(response.data.data.user.gender);
      })
      .catch(function (error) {
        HideLoading();
        console.log(error);
      });
  };
  const onChangeText = (event, selectedDate) => {
    console.log('SelectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const updateProfile = async values => {
    ShowLoading();
    var config = {
      method: 'post',
      url: `${baseUrl}update_profile_practice`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {
        name: name,
        email: email,
        designation: designation,
        city: city,
        state: stat,
        zip_code: zipCode,
        practice: practice,
        insurance: malPractice,
        license: license,
        location: address,
        phone: phoneNumber,
        phone_code: formatedPhoneNumber.replace(phoneNumber, ''),
        gender: gender,
        lng: lng,
        lat: lat,
        fee: fee,
        image: image.uri,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          alert(response.data.message);
          HideLoading();
          setRefresh(!refresh);
          console.log('res==>', response.data);
        }
      })
      .catch(function (error) {
        HideLoading();
        console.log('The error is as follows', error.response.data);
        alert(error.response.data.message);
      });
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
        session_token: session.session_key,
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
  const LicenseUpload = (File, type) => {
    setLoading(true);
    var data = new FormData();
    data.append('file', {
      uri: File,
      name: 'chat.pdf',
      type: type,
    });
    console.log('the data is here', data);
    let config = {
      method: 'post',
      url: `http://3.18.236.184/theralign/api/v1/file_upload`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert('Upload Success');
        setLoading(false);
        console.log('hjaskjdhaskjnhdk', response.data.data.file_path);
        setLicense(response.data.data.file_path);
      })
      .catch(function (error) {
        setLoading(false);
        alert('License Upload failed please try again');
        console.log('Eroror----------------------->', error?.response?.data);
      });
  };
  const MalUpload = (File, type) => {
    setLoading(true);
    var data = new FormData();
    data.append('file', {
      uri: File,
      name: 'chat.pdf',
      type: type,
    });
    console.log('the data is here', data);
    let config = {
      method: 'post',
      url: `http://3.18.236.184/theralign/api/v1/file_upload`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        alert('Upload Success');
        setMalPractice(response.data.data.file_path);
      })
      .catch(function (error) {
        setLoading(false);
        alert('Insurance upload failed please try again');
        console.log('Eroror----------------------->', error?.response?.data);
      });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChangeText={onChangeText}
          />
        )}
        {console.log('The image is as follows', image)}
        <View style={{flex: 2, justifyContent: 'center'}}>
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
            <View style={{flexDirection: 'row', marginBottom: '3%'}}>
              <AppText
                style={{
                  fontSize: RFValue(24),
                  fontWeight: 'bold',
                  color: colors.dark,
                  flex: 1,
                }}>
                Profile
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  style={{marginRight: '2%', marginTop: '2%'}}
                  source={require('../../assets/images/Pencil.png')}
                />

                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontWeight: 'bold',
                    color: colors.primary,
                    textAlign: 'right',
                    alignSelf: 'center',
                  }}>
                  Edit Profile
                </Text>
              </View>
            </View>
            <AppText
              style={{
                fontSize: RFValue(13),
                color: colors.black,
                paddingBottom: 5,
                paddingRight: 50,
              }}>
              Your information will be shared with our Medical Expert team.
            </AppText>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          {image.uri ? (
            <Image
              style={{
                height: 113,
                width: 114,
                margin: 10,
                alignSelf: 'center',
                borderRadius: 4,
              }}
              source={{uri: `${imageUrl}${image.uri}`}}
            />
          ) : (
            <Image
              style={{
                height: 113,
                width: 114,
                margin: 10,
                alignSelf: 'center',
                borderRadius: 4,
                marginLeft: 0,
              }}
              source={require('../../assets/images/User.png')}
            />
          )}
          <View
            style={{
              flex: 1,
              width: '50%',
              height: '100%',
            }}>
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
                backgroundColor: colors.green,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                alignSelf: 'center',
                paddingHorizontal: '10%',
                paddingVertical: '5%',
                marginTop: '10%',
                marginBottom: '1%',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Uplaod Your Profile Picture
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                color: '#304659',
                fontSize: RFValue(12),
                marginVertical: '2%',
                marginLeft: '5%',
              }}>
              Bio
            </Text>

            <View style={styles.searchSection}>
              <Text style={{fontSize: RFValue(10), color: '#9a9a9a'}}>
                Your avatar should is a friendly
              </Text>
              <Text style={{fontSize: RFValue(10), color: '#9a9a9a'}}>
                and inviting head shot. Clearly
              </Text>
              <Text style={{fontSize: RFValue(10), color: '#9a9a9a'}}>
                indentifiable as you.
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: '5%'}}>
          <>
            <Formik
              onSubmit={values => {
                console.log('the values are', values);
              }}
              validationSchema={validationSchema}>
              {({handleChange, handleSubmit, setFieldTouched}) => (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Full Name
                      </Text>
                      <AppFormField
                        name="FullName"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        textContentType="name"
                        styles={styles.AppTextInput}
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Email
                      </Text>
                      <AppFormField
                        name="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Designation
                      </Text>
                      <AppFormField
                        name="Designation"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={designation}
                        onChangeText={setDesignation}
                      />
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        City
                      </Text>
                      <AppFormField
                        name="City"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={city}
                        onChangeText={setCity}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        State
                      </Text>
                      <AppFormField
                        name="Stat"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={stat}
                        onChangeText={setStat}
                      />
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Zip Code
                      </Text>
                      <AppFormField
                        name="ZipCode"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={zipCode}
                        onChangeText={setZipCode}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        License pdf
                      </Text>

                      <View
                        style={{
                          flex: 1,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: '#a4c8d5',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            const results = await DocumentPicker.pickSingle({
                              type: 'application/pdf',
                            });
                            console.log('The results are as follows', results);
                            LicenseUpload(results.uri, results.type);
                          }}>
                          <Image
                            source={require('../../assets/images/document.png')}
                            style={{marginRight: '5%'}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Malpractice ins. pdf
                      </Text>
                      <View></View>
                      <View
                        style={[
                          {
                            flex: 1,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#a4c8d5',
                            alignItems: 'flex-end',
                            height: heightPercentageToDP('6.5%'),
                            justifyContent: 'center',
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={async () => {
                            const results = await DocumentPicker.pickSingle({
                              type: 'application/pdf',
                            });
                            console.log('The results are as follows', results);
                            MalUpload(results.uri, results.type);
                          }}>
                          <Image
                            source={require('../../assets/images/document.png')}
                            style={{marginRight: '5%'}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '5%'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Fee
                      </Text>
                      <AppFormField
                        name="Fee"
                        autoCapitalize="none"
                        autoCorrect={false}
                        styles={styles.AppTextInput}
                        value={fee}
                        onChangeText={setFee}
                        keyboardType="number-pad"
                        price={true}
                      />
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Practice
                      </Text>
                      <DropDownField
                        data={[
                          'Self Employed',
                          'Employed',
                          'Student',
                          'Others',
                        ]}
                        Select={e => {
                          console.log(e);
                          handleChange('Practice', e);
                          setPractice(e);
                        }}
                      />
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Credentials
                      </Text>
                      <AppFormField
                        name="Credentials"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={credentials}
                        onChangeText={setCredentials}
                      />
                    </View>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                        Gender
                      </Text>
                      <DropDownField
                        data={['Male', 'Female', 'Others']}
                        value={gender}
                        Select={e => {
                          console.log(e);
                          setGender(e);
                          handleChange('Gender', e);
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                    Address
                  </Text>
                  <AppFormField
                    name="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched('Address')}
                    styles={styles.AppTextInput}
                    Address={true}
                    value={address}
                    onChangeText={setAddress}
                  />
                  <Text style={{fontSize: RFValue(13), fontWeight: '500'}}>
                    Mobile Phone
                  </Text>
                  <PhoneInput
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: '#A4C8D5',
                      flex: 1,
                      width: '100%',
                      height: heightPercentageToDP('7%'),
                    }}
                    textInputStyle={{
                      fontSize: RFValue(15),
                      padding: 0,
                      textAlignVertical: 'center',
                      paddingTop: 5,
                    }}
                    textContainerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: '#A4C8D5',
                      marginLeft: '8%',
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    codeTextStyle={{
                      fontSize: RFValue(15),
                    }}
                    countryPickerButtonStyle={{
                      borderColor: '#A4C8D5',
                      borderRadius: 8,
                      borderWidth: 1,
                      fontSize: RFValue(18),
                    }}
                    // defaultValue={phoneNumber}
                    initialValue={phoneNumber}
                    // value={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    onChangeText={text => {
                      console.log('The number is ', text);
                      console.log('The type is ', typeof text);
                      setPhoneNumber(text);
                      // setValue(text);
                      handleChange('phoneNumber', text);
                    }}
                    onChangeFormattedText={text => {
                      handleChange('formatedPhoneNumber', text);
                      setFormatedPhoneNumber(text);
                    }}
                    withDarkTheme={false}
                    withShadow={false}
                  />
                  <View style={{marginTop: '5%'}}>
                    <AppButton
                      title="Add Payment Methods"
                      onPress={() => {
                        // updateProfile();
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
export default TherapistProfile;

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    marginBottom: 20,
    marginLeft: '5%',
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
    backgroundColor: '#fff',
    color: '#424242',
  },
  inputBio: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#424242',
    height: '100%',
  },
  container: {flex: 1, padding: 10},
  back_btn: {
    marginVertical: 20,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    backgroundColor: '#fff',
    elevation: 3,
  },
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
});

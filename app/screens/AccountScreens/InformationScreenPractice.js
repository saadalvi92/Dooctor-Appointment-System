import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl, imageUrl} from '../../utils/baseUrl';
import axios from 'axios';
import Screen from '../../components/Screen';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import AppButton from '../../components/Button';
import {Formik} from 'formik';
import AppFormField from '../../components/forms/FormField';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay/lib';

function PracticeProfile({navigation: {navigate, goBack, popToTop}, route}) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [session, setSession] = useState('');

  const [user, setUser] = useState('');
  const [name, setName] = useState();
  const [address, setAddress] = useState('');
  const [image, setImage] = useState({});
  const onChange = (event, selectedDate) => {
    console.log('SelectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    getData();
  }, []);

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
  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
  };
  const getData = async () => {
    let tempUser = await AsyncStorage.getItem('user');
    let sessionData = await AsyncStorage.getItem('session');
    setSession(JSON.parse(sessionData));
    // console.log('user', JSON.parse(tempUser).id);

    setUser(JSON.parse(tempUser));

    tempUser = JSON.parse(tempUser).id;
    sessionData = JSON.parse(sessionData).session_key;
    console.log('user', tempUser);
    console.log('session', sessionData);

    ShowLoading();
    var config = {
      method: 'get',
      url: `${baseUrl}get_user_profile/${tempUser}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: sessionData,
      },
    };
    axios(config)
      .then(function (response) {
        HideLoading();
        console.log('response', response.data.data.user.location);
        setAddress(response.data.data.user.location);
        setName(response.data.data.user.name);
      })
      .catch(function (error) {
        HideLoading();
        console.log(error);
      });
  };

  const updateProfile = async values => {
    ShowLoading();
    console.log('hello==>', session.session_key);

    var config = {
      method: 'post',
      url: `${baseUrl}update_doc_profile`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {
        name: name,
        location: address,
        image: image.uri,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          HideLoading();

          setRefresh(!refresh);
          // popToTop();
          navigate('LoginScreen');
          alert('Successful');
          // navigation.popToTop();
        }
      })
      .catch(function (error) {
        HideLoading();
        console.log('The error is as follows', error);
        // setError(error.response.data.message);

        // alert(error.response.data.message);
        // AsyncStorage.removeItem('user');
        // AsyncStorage.removeItem('session');
        // AsyncStorage.removeItem('creds');
        // route.params.setState(false);
      });
  };
  const updateImage = (Image, type) => {
    ShowLoading();
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
        HideLoading();
        console.log('hjaskjdhaskjnhdk', response.data.data.file_path);
        setImage({
          uri: `${response.data.data.file_path}`,
        });
      })
      .catch(function (error) {
        HideLoading();
        console.log('Eroror----------------------->', error?.response?.data);
      });
  };

  return (
    <Screen style={styles.container} top={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={{flex: 2, justifyContent: 'center'}}>
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
                  source={require('../../assets/images/Pencil.png')}
                  style={{marginRight: '2%', marginTop: '2%'}}
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
                paddingHorizontal: '10%',
                paddingVertical: '5%',
                marginTop: '10%',
                marginBottom: '1%',
                width: wp('50%'),
              }}>
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Uplaod Your Logo
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
              <Text style={{fontSize: RFValue(10)}}>indentifiable as you.</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 8}}>
          <>
            <Formik
              initialValues={{name: '', Address: ''}}
              onSubmit={values => console.log(values)}
              validationSchema={validationSchema}>
              {({handleChange, handleSubmit, setFieldTouched}) => (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: '2%'}}>
                      <Text
                        style={{
                          fontSize: RFValue(13),
                          fontWeight: '500',
                          color: '#1e1f20',
                        }}>
                        Full Name
                      </Text>
                      <AppFormField
                        name="name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        textContentType="name"
                        value={name}
                        onChangeText={text => setName(text)}
                        styles={{
                          borderWidth: 1,
                          borderColor: colors.lightGray,
                          flexDirection: 'row',
                          borderRadius: 5,
                          paddingHorizontal: 12,
                          marginBottom: 20,
                          backgroundColor: 'transparent',
                          color: '#A4C8D5',
                        }}
                      />
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: RFValue(13),
                      fontWeight: '500',
                      color: '#1e1f20',
                    }}>
                    Address
                  </Text>
                  <AppFormField
                    name="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={address}
                    onBlur={() => setFieldTouched('Address')}
                    onChangeText={text => setAddress(text)}
                    styles={{
                      borderWidth: 1,
                      borderColor: colors.lightGray,
                      flexDirection: 'row',
                      borderRadius: 5,
                      paddingHorizontal: 12,
                      marginBottom: 20,
                      backgroundColor: 'transparent',
                      color: '#A4C8D5',
                    }}
                    Address={true}
                  />

                  <View style={{flex: 1, marginTop: '6%'}}>
                    <AppButton
                      title="Save & Continue"
                      onPress={() => {
                        updateProfile();
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </>
        </View>
      </ScrollView>
    </Screen>
  );
}
export default PracticeProfile;

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

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../utils/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../config/colors';
import RatingStars from '../components/RatingStars';
import AppText from '../components/Text';
import {Rating} from 'react-native-ratings';
import AppButton from '../components/Button';
import Screen from '../components/Screen';
import CustomRatingBar from '../components/StarRatingBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
function RatingScreen(props) {
  const [loading, setLoading] = useState(false);
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const details = props.route.params;

  const submit = async () => {
    const defaultsession = await AsyncStorage.getItem('session');
    const currentSession = await JSON.parse(defaultsession);
    console.log('Rating is: ' + defaultRating);
    console.log('details is: ' + details.data.id);
    setLoading(true);

    var config = {
      method: 'post',
      url: `${baseUrl}add_rating`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: currentSession.session_key,
      },
      data: {
        doc_id: details.data.id,
        rating: defaultRating,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setLoading(false);
          alert('successful');
          // console.log('response', response.data);
          props.navigation.navigate('HomeScreen');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log('The error is as follows', error.response.data);
        alert(error.response.data.message);
      });
  };
  return (
    <Screen top={true}>
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
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          flex: 1,
          paddingLeft: '5%',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: RFValue(16),
            color: colors.dark,
            marginVertical: '5%',
            marginBottom: '8%',
          }}>
          Rate your experience
        </Text>
        <View style={styles.profileCard}>
          <View
            style={{
              flex: 1,
              marginRight: '3%',
            }}>
            {details.image == null ? (
              <Image
                source={require('../assets/images/User.png')}
                resizeMode="cover"
                style={{height: hp('17%'), width: wp('30%'), borderRadius: 12}}
              />
            ) : (
              <Image
                source={require('../assets/images/User.png')}
                resizeMode="cover"
                style={{height: hp('17%'), width: wp('30%'), borderRadius: 12}}
              />
            )}
          </View>
          <View
            style={{
              flex: 2,
              height: 100,
            }}>
            <Text
              style={{
                color: colors.dark,
                fontSize: RFValue(16),
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              {details.data.name}
            </Text>
            <Text
              style={{
                color: '#8c9c83',
                fontSize: RFValue(14),
                marginBottom: 5,
              }}>
              {details.data.designation}
            </Text>
            <Text
              style={{
                color: '#899ba2',
                fontSize: RFValue(14),
                marginBottom: 5,
              }}>
              2 Rue de Ermesinde Frisange - Luxembourg 3 km
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RatingStars number={details.data?.rating} />
              <AppText style={{color: colors.textGray, fontSize: RFValue(14)}}>
                ({details.data?.reviews})
              </AppText>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            marginVertical: hp('5%'),
          }}>
          <CustomRatingBar
            maxRating={maxRating}
            defaultRating={defaultRating}
            setDefaultRating={setDefaultRating}
          />
        </View>

        {/* <Rating
          type="custom"
          ratingImage={require('../assets/images/RatingImage.png')}
          // ratingColor="#3498db"
          ratingBackgroundColor="transparent"
          onFinishRating={ratingCompleted}
          style={{
            paddingVertical: 10,
            marginVertical: hp('5%'),
          }}
          ratingCount={5}
        /> */}
        <View style={{width: '95%'}}>
          <AppButton title="Submit" onPress={() => submit()} />
        </View>
      </View>
    </Screen>
  );
}

export default RatingScreen;
const styles = StyleSheet.create({
  profileCard: {
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#a4c3ce',
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: wp('93%'),
  },
});

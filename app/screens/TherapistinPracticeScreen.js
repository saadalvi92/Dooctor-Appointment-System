import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import colors from '../config/colors';
import RatingStars from '../components/RatingStars';
import AppText from '../components/Text';
import SearchField from '../components/SearchField';
import ListingTherapist from '../components/ListingTherapist';
import Screen from '../components/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../utils/baseUrl';
import axios from 'axios';
function TherapistinPracticeScreen(props) {
  const details = props.route.params;
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {name: 'Dr Haris Khalid', designation: 'Therapist', rating: 5, reviews: 20},
    {name: 'Dr Sharjeel', designation: 'Therapist', rating: 2, reviews: 25},
  ]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const defaultuser = await AsyncStorage.getItem('user');
    const defaultsession = await AsyncStorage.getItem('session');
    const currentUser = await JSON.parse(defaultuser);
    const currentSession = await JSON.parse(defaultsession);
    setUser(currentUser);
    setSession(currentSession);
    let config = {
      method: 'get',
      url: `${baseUrl}get_my_doc`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: currentSession.session_key,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        console.log('the response is as follows', response.data.data.docs);
        const newData = response.data.data.docs.map((doc, index) => {
          return {
            id: item.id,
            name: item.name,
            designation: item.type,
            image: item.image,
            fee: item.fee,
            distance: item.distance,
            rating: item.avg_rating == null ? 5 : item.avg_rating,
            reviews: item.rating_count,
            location: item.location,
            email: item.email,
            age: item.age,
            lng: item.lng,
            lat: item.lat,
          };
        });

        setData(newData);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Screen top={true}>
      <View
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          flex: 1,
          paddingLeft: '5%',
        }}>
        {console.log('The details are here', details.data)}
        <View style={styles.profileCard}>
          <View
            style={{
              flex: 1,
              marginRight: '3%',
            }}>
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{height: hp('12%'), width: wp('23%'), borderRadius: 4}}
            />
          </View>
          <View
            style={{
              flex: 3,
              height: hp('14%'),
              marginLeft: '5%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.dark,
                fontSize: RFValue(14),
                fontWeight: 'bold',
                marginBottom: '1%',
              }}>
              {details.data.name}
            </Text>
            <Text
              style={{
                color: colors.textGray,
                fontSize: RFValue(12),
                marginBottom: '0.5%',
              }}>
              {details.data.designation}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                <RatingStars number={details.data.rating} />
                <AppText style={{color: colors.textGray, fontSize: 12}}>
                  ({details.data.reviews})
                </AppText>
              </View>
            </View>
          </View>
        </View>
        <View style={{paddingRight: '8%'}}>
          <SearchField
            navigation={props.navigation}
            TouchNavigate={false}
            showMap={false}
          />
        </View>
        <FlatList
          style={styles.description}
          data={data}
          key={item => {
            item.index;
          }}
          renderItem={({item}) => (
            <ListingTherapist
              goto={() => {
                // item.designation == 'Practice'
                //   ? props.navigation.navigate('TherapistinPracticeScreen', {
                //       isFocus: true,
                //       data: item,
                //     })
                //   : props.navigation.navigate('AppointmentScreen', {
                //       isFocus: true,
                //       data: item,
                //     });
                alert('the practice is not yet ready');
              }}
              details={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </Screen>
  );
}

export default TherapistinPracticeScreen;
const styles = StyleSheet.create({
  profileCard: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

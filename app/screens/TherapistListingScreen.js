import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import Header from '../components/Header';
import Screen from '../components/Screen';
import SearchField from '../components/SearchField';
import ListingTherapist from '../components/ListingTherapist';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../config/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {baseUrl} from '../utils/baseUrl';
function TherapistListingScreen(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const userData = JSON.parse(data);
    const userSession = JSON.parse(data1);
    setUser(userData);
    setSession(userSession);
    let config = {
      method: 'get',
      url: `${baseUrl}search?q=${search}&lat=0&lng=0`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: userSession.session_key,
      },
    };

    axios(config)
      .then(response => {
        setLoading(false);
        const responsedata = response.data.data.users.map((item, index) => {
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
        setData(responsedata);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <Screen style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header />
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
        <SearchField
          navigation={props.navigation}
          TouchNavigate={false}
          search={txt => {
            setSearch(txt);
            getData();
          }}
        />
        <FlatList
          style={styles.description}
          data={data}
          key={item => {
            item.index;
          }}
          renderItem={({item}) => (
            <ListingTherapist
              goto={() => {
                item.designation == 'practice'
                  ? props.navigation.navigate('TherapistinPracticeScreen', {
                      isFocus: true,
                      data: item,
                    })
                  : props.navigation.navigate('AppointmentScreen', {
                      isFocus: true,
                      data: item,
                    });
              }}
              details={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    </Screen>
  );
}

export default TherapistListingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 3,
  },
  backContainer: {
    marginVertical: 25,
  },
  profileCard: {
    height: hp('20%'),
    flexDirection: 'row',
  },
});

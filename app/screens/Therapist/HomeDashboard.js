import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import SearchField from '../../components/SearchField';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import colors from '../../config/colors';
import AppointmentsCard from '../../components/AppointmentsCard';
import AppButton from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {baseUrl} from '../../utils/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
function HomeDashboard({navigation, route}) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [bookings, setBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isFecthing,setIsFetching]=useState(fa)
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const detailUser = JSON.parse(data);
    const detailSession = JSON.parse(data1);
    setUser(detailUser);
    setSession(detailSession);
    let config = {
      method: 'post',
      url: `${baseUrl}bookings_on_calendar`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: detailSession.session_key,
      },
      data: {
        date: moment(Date.now()).format('YYYY-MM-DD'),
      },
    };

    axios(config)
      .then(response => {
        console.log('The response is here', response.data.data.bookings);
        const newData = response.data.data.bookings.map((item, index) => {
          return {
            name: item.user.name,
            designation: item.user.type,
            user_id: item.user_id,
            email: item.user.email,
            amount: item.amount,
            is_canceled: item.is_cancelled,
            start_time: item.start_date,
            end_time: item.end_date,
            booking_id: item.id,
            image: item.user.image,
          };
        });
        const newBookings = response.data.data.bookings.map((item, index) => {
          return {
            amount: 100,
            clinic_id: item.clinic_id,
            created_at: item.created_at,
            end_date: item.end_date,
            id: item.id,
            is_cancelled: item.is_cancelled,
            parctice_id: item.parctice_id,
            start_date: item.start_date,
            transaction_id: item.transaction_id,
            type: item.type,
            updated_at: item.updated_at,
            user_id: item.user_id,
          };
        });
        const filteredNewData = newData.filter((item, index) => {
          const stringdata = item.start_time.slice(11, 16);
          console.log(
            'the item start time is ',
            moment(Date.now()).format('HH:mm'),
            stringdata,
          );
          if (stringdata >= moment(Date.now()).format('HH:mm')) {
            return item;
          }
        });
        setBookings(newBookings);
        setFilteredData(filteredNewData);
        setData(filteredNewData);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const SearchFilter = txt => {
    if (txt) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(txt);
    } else {
      setFilteredData(data);
      setSearch(txt);
    }
  };
  const getBookings = () => {
    setLoading(true);
    let config = {
      method: 'get',
      url: `${baseUrl}get_doc_bookings`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };

    axios(config)
      .then(response => {
        setLoading(false);
        console.log('the new data is here', response.data.data.online);
        navigation.navigate('ScheduleCalendarScreen', {
          navigate: false,
          unavailable: [],
          bookings: [
            ...response.data.data.clinic,
            ...response.data.data.online,
          ],
          type: 'online',
          doc: {},
        });
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    setRefresh(!refresh);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={{paddingTop: 10}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header navigation={navigation} />
        <SearchField
          navigation={navigation}
          TouchNavigate={false}
          showMap={false}
          search={txt => {
            SearchFilter(txt);
          }}
          Title="Search Appointments"
        />
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
            alignItems: 'center',
            backgroundColor: '#ffffff',
            height: 120,
            width: '95%',
            alignSelf: 'center',
            padding: '5%',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(13),
              color: '#9393aa',
              fontWeight: '500',
            }}>
            View Client Appointment
          </Text>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image
              source={require('../../assets/images/CalendarTherapist.png')}
              style={{marginTop: '1%'}}
            />
            <TouchableOpacity
              onPress={() => {
                getBookings();
              }}>
              <Text
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 12,
                  fontSize: RFValue(16),
                  color: '#304659',
                  fontWeight: '500',
                }}>
                {moment(Date.now()).format('DD MMMM YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: '4%', flex: 1}}>
          <AppButton
            title="Set Your Availability"
            onPress={() => {
              navigation.navigate('Availablity');
            }}
            background={true}
            color={'green'}
          />
        </View>
        <View style={{marginTop: '5%'}}>
          <Text
            style={{marginBottom: '1%', color: '#9393aa', marginLeft: '2%'}}>
            ({data.length}) Today Consultation
          </Text>
          <FlatList
            style={styles.description}
            data={filteredData}
            key={item => {
              item.index;
            }}
            renderItem={({item}) => (
              <AppointmentsCard
                goto={() => {
                  navigation.navigate('ChatScreen', {
                    currentChat: {
                      chatId: null,
                      chatImage: user.image,
                      chatName: user.name,
                      designation: item.designation,
                      id: item.user_id,
                      image: item.image,
                      message: '',
                      name: item.name,
                      senderId: user.id,
                    },
                  });
                }}
                details={item}
                color="#fff"
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default HomeDashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    paddingBottom: 3,
  },
});

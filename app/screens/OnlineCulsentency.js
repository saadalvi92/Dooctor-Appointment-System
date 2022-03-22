import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import SearchField from '../components/SearchField';
import AppointmentsCard from '../components/AppointmentsCard';
import ListingTherapist from '../components/ListingTherapist';
import Screen from '../components/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../config/colors';
import {useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {baseUrl} from '../utils/baseUrl';
function OnlineCulsentency(props) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh, isFocused]);
  const getData = async () => {
    const defaultuser = await AsyncStorage.getItem('user');
    const defaultsession = await AsyncStorage.getItem('session');
    const currentUser = JSON.parse(defaultuser);
    const currentSession = JSON.parse(defaultsession);
    setUser(currentUser);
    setSession(currentSession);
    if (currentUser.type == 'therapist') {
      console.log('The user is therapist');
      let config = {
        method: 'get',
        url: `${baseUrl}get_doc_bookings`,
        headers: {
          app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
          session_token: currentSession.session_key,
        },
      };

      axios(config)
        .then(response => {
          setLoading(false);
          console.log('The data is here', response.data.data.online[0]);
          const newData = response.data.data.online.map((item, index) => {
            return {
              name: item.user.name,
              designation: item.user.type,
              doc_id: item.user.id,
              start_time: item.start_date,
              end_time: item.end_date,
              type: 'online',
              id: item.id,
              image: item.user.image,
            };
          });
          setData(newData);
          setFilteredData(newData);
          setRefreshing(false);
        })
        .catch(error => {
          setLoading(false);
          setRefreshing(false);
          console.log(error);
        });
    } else {
      console.log('The user is not therapist');
      let config = {
        method: 'get',
        url: `${baseUrl}get_client_booking`,
        headers: {
          app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
          session_token: currentSession.session_key,
        },
      };

      axios(config)
        .then(response => {
          setLoading(false);
          console.log('The data is here', response.data.data.online[0]);
          const newData = response.data.data.online.map((item, index) => {
            return {
              name: item.doctor.name,
              designation: item.doctor.type,
              doc_id: item.doctor.id,
              start_time: item.start_date,
              end_time: item.end_date,
              type: 'online',
              id: item.id,
              gender: item.doctor.gender,
              location: item.doctor.location,
              image: item.doctor.image,
            };
          });
          console.log('The new data is here for online culsentency', newData);
          setData(newData);
          setFilteredData(newData);
          setRefreshing(false);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
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
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData(data);
      setSearch(txt);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setRefresh(!refresh);
  };
  return (
    <Screen style={styles.container}>
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
        showMap={false}
        search={txt => {
          SearchFilter(txt);
        }}
        Title="Search Appointments"
      />
      <FlatList
        style={styles.description}
        data={filteredData}
        key={item => {
          item.index;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <AppointmentsCard
            goto={() => {
              console.log('the item is', item);
              props.navigation.navigate('AppointmentDetails', {
                data: item,
                onPress: () => {
                  setRefresh(!refresh);
                },
                user: user,
                color: 'video',
              });
            }}
            details={item}
            color="#DCEAF4"
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default OnlineCulsentency;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

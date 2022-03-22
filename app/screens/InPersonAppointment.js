import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import SearchField from '../components/SearchField';
import AppointmentsCard from '../components/AppointmentsCard';
import Screen from '../components/Screen';
import Modal from '../components/Modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../config/colors';
import {baseUrl} from '../utils/baseUrl';
function InPersonAppointment(props) {
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
          console.log('the new data is here', response.data);
          const newData = response.data.data.clinic.map((item, index) => {
            return {
              name: item.user.name,
              designation: item.user.type,
              doc_id: item.user.id,
              start_time: item.start_date,
              end_time: item.end_date,
              type: 'clinic',
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
          console.log(error);
        });
    } else {
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
          console.log('the new data is here', response.data);
          const newData = response.data.data.clinic.map((item, index) => {
            return {
              name: item.doctor.name,
              designation: item.doctor.type,
              doc_id: item.doctor.id,
              start_time: item.start_date,
              end_time: item.end_date,
              type: 'clinic',
              id: item.id,
              image: item.doctor.image,
            };
          });
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
      const newData = data.filter(function (item) {
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
  const onRefresh = () => {
    setRefreshing(true);
    setRefresh(!refresh);
  };
  return (
    <Screen style={styles.container}>
      <SearchField
        navigation={props.navigation}
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
              props.navigation.navigate('AppointmentDetails', {
                data: item,
                onPress: () => {
                  setRefresh(!refresh);
                },
                user: user,
                color: 'inperson',
              });
            }}
            details={item}
            color="#fff"
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default InPersonAppointment;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

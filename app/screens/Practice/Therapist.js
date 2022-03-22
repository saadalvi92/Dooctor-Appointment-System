import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import SearchField from '../../components/SearchField';
import PracticeClient from '../../components/PracticeClient';
import Screen from '../../components/Screen';
import axios from 'axios';
import moment from 'moment';
import {baseUrl} from '../../utils/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
function Therapist(props) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState('');
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const dataUser = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const detailUser = JSON.parse(dataUser);
    const detailSession = JSON.parse(data1);
    setUser(detailUser);
    setSession(detailSession);
    let config = {
      method: 'get',
      url: `${baseUrl}get_my_doc`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: detailSession.session_key,
      },
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data.data));
        const newData = response.data.data.docs.map((item, index) => {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            designation: item.type,
            rating: 5,
            reviews: 20,
            gender: item.gender,
            fee: item.fee,
            address: item.location,
            city: item.city,
            email: item.email,
            image: item.image,
          };
        });
        setData(newData);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  return (
    <Screen style={styles.container}>
      <SearchField
        navigation={props.navigation}
        TouchNavigate={false}
        showMap={false}
      />
      <FlatList
        style={styles.description}
        data={data}
        key={item => {
          item.index;
        }}
        renderItem={({item}) => (
          <PracticeClient
            goto={() => {
              props.navigation.navigate('TherapistAccountScreen', {item});
            }}
            details={item}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default Therapist;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import SearchField from '../../components/SearchField';
import ListingTherapist from '../../components/ListingTherapist';
import colors from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl} from '../../utils/baseUrl';
function SearchScreen(props) {
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const defaultuser = await AsyncStorage.getItem('user');
    const defaultsession = await AsyncStorage.getItem('session');
    const currentUser = await JSON.parse(defaultuser);
    const currentSession = await JSON.parse(defaultsession);
    await setUser(currentUser);
    await setSession(currentSession);
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
        const newData = response.data.data.docs.map((doc, index) => {
          return {
            id: doc.id,
            name: doc.name,
            designation: doc.type,
            rating: doc.avg_rating == null ? 5 : doc.avg_rating,
            reviews: doc.rating_count,
            status: 'friend',
            image: doc.image,
          };
        });

        if (props.route.params == undefined) {
          console.log('DOCS', response.data.data.docs);
          setDataSource(newData);
          setData(newData);
        } else {
          console.log('call other API');
          getDocs(newData, currentSession);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getDocs = async (Arr, currentSession) => {
    setLoading(true);
    console.log('session', currentSession.session_key);
    let config = {
      method: 'get',
      url: `${baseUrl}search_doc`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: currentSession.session_key,
      },
    };
    axios(config)
      .then(response => {
        setLoading(false);
        const newData = response.data.data.docs.map((doc, index) => {
          return {
            id: doc.id,
            name: doc.name,
            designation: doc.type,
            rating: doc.avg_rating == null ? 5 : doc.avg_rating,
            reviews: doc.rating_count,
            status: 'noFriend',
            image: doc.image,
          };
        });

        const newArr = Arr.map(item => item.id);

        const newArr2 = newData.filter(item => !newArr.includes(item.id));
        setDataSource(newArr2);
        setData(newArr2);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  const search = (e = ' ', Arr = dataSource) => {
    let config = {
      method: 'get',
      url: `${baseUrl}search_doc?q=${e}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };

    axios(config)
      .then(response => {
        setLoading(false);
        const newData = response.data.data.docs.map((doc, index) => {
          return {
            id: doc.id,
            name: doc.name,
            designation: doc.type,
            rating: doc.avg_rating == null ? 5 : doc.avg_rating,
            reviews: doc.rating_count,
            status: 'noFriend',
            image: doc.image,
          };
        });

        const newArr = Arr.map(item => item.id);

        const newArr2 = newData.filter(item => newArr.includes(item.id));
        setData(newArr2);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  const requestDoc = async id => {
    setLoading(true);

    var config = {
      method: 'post',
      url: `${baseUrl}request_doc`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
      data: {
        doc_id: id,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setLoading(false);
          alert('successful');
          console.log('response', response.data);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log('The error is as follows', error.response.data);
        alert(error.response.data.message);
      });
  };
  return (
    <Screen style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        <TouchableOpacity
          style={{marginRight: 35}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          {/* <Ionicons name="chevron-back-sharp" size={30} color={colors.medium} /> */}
          <Image source={require('../../assets/images/Chevron_Right.png')} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
          }}>
          <View style={{marginHorizontal: '4%'}}>
            <Image
              source={require('../../assets/images/Search.png')}
              height={20}
              width={20}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search Client, Therapist"
            placeholderTextColor={colors.textGray}
            onChangeText={e => {
              search(e);
            }}
          />
        </View>
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
              console.log('the data is here', item);
              item.status == 'friend'
                ? props.navigation.navigate('ChatScreen', {
                    currentChat: {
                      chatId: null,
                      chatImage: item.image,
                      chatName: item.name,
                      designation: item.designation,
                      id: item.id,
                      image: user.image,
                      message: '',
                      name: user.name,
                      senderId: user.id,
                    },
                  })
                : requestDoc(item.id);
            }}
            details={item}
            status={true}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default SearchScreen;
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
    height: '20%',
    flexDirection: 'row',
  },
  input: {
    // flex: 1,
    fontSize: RFValue(13),
    width: widthPercentageToDP('60%'),
  },
});

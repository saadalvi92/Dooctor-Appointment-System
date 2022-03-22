import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import SearchField from '../../components/SearchField';
import ChatListItem from '../../components/ChatListItem';
import Screen from '../../components/Screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../config/colors';
import {baseUrl} from '../../utils/baseUrl';
import {useIsFocused} from '@react-navigation/native';
function ClientChat(props) {
  const isFocused = useIsFocused();
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filteredChat, setFilteredChat] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh, isFocused]);
  const getData = async () => {
    const data2 = await AsyncStorage.getItem('user');
    const user = JSON.parse(data2);
    const data1 = await AsyncStorage.getItem('session');
    const session = JSON.parse(data1);
    console.log('the data is here', session);
    var config = {
      method: 'get',
      url: `${baseUrl}get_chats`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };

    axios(config)
      .then(function (response) {
        HideLoading();
        console.log('the data from the api is here', response.data.data);
        const newChats = response.data.data.chats.map((chat, index) => {
          return {
            id:
              chat.message_receiver.id == user.id
                ? chat.message_sender.id
                : chat.message_receiver.id,
            name:
              chat.message_receiver.id == user.id
                ? chat.message_sender.name
                : chat.message_receiver.name,
            designation:
              chat.message_receiver.id == user.id ? chat.sender : chat.receiver,
            message: chat.last_message?.message,
            image:
              chat.message_receiver.id == user.id
                ? chat.message_sender.image
                : chat.message_receiver.image,
            senderId:
              chat.message_receiver.id == user.id
                ? chat.message_receiver.id
                : chat.message_sender.id,
            chatId: chat.id,
            chatName:
              chat.message_receiver.id == user.id
                ? chat.message_receiver.name
                : chat.message_sender.name,
            chatImage:
              chat.message_receiver.id == user.id
                ? chat.message_receiver.image
                : chat.message_sender.image,
            role:
              chat.message_receiver.id == user.id ? chat.sender : chat.receiver,
          };
        });
        const filteredRole = newChats.filter((item, index) => {
          if (item.role == 'client') {
            return item;
          }
        });
        setFilteredChat(filteredRole);
        setChats(filteredRole);
        setRefreshing(false);
      })
      .catch(function (error) {
        HideLoading();
        console.log(error);
      });
  };
  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
  };
  const SearchFilter = txt => {
    if (txt) {
      const newData = chats.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredChat(newData);
      setSearch(txt);
    } else {
      setFilteredChat(chats);
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
      />
      <FlatList
        data={filteredChat}
        key={item => {
          item.index;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <ChatListItem
            goto={() => {
              props.navigation.navigate('ChatScreen', {currentChat: item});
            }}
            currentChat={item}
            details={item}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default ClientChat;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

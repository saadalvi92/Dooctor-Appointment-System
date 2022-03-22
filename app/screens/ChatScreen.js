import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import SocketIOClient from 'socket.io-client';
let socket = SocketIOClient('https://sockets.foreachsol.com:5007');
import {baseUrl, imageUrl} from '../utils/baseUrl';
function ChatScreen({navigation, route}) {
  const scrollViewRef = useRef();
  // var {currentChat} = route.params;
  const [currentChat, setCurrentChat] = useState(route.params.currentChat);
  const [rating, setRating] = useState(false);
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [userSession, setUserSession] = useState({});
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(hp('5%'));
  const [chatId, setChatId] = useState();
  socket.on('message_send', msg => {
    console.log('The data is here', msg);
    setMessage('');
    const newChat = {
      chat_id: msg.chat_id,
      is_read: 1,
      message: msg.message,
      receiver: {
        id: msg.user_id,
      },
      receiver_id: msg.user_id,
      sender: {
        id: msg.other_id,
        image: msg.photo,
        name: msg.other_name,
      },
      sender_id: msg.other_id,
    };
    console.log('The data is here', newChat);
    setChats([...chats, newChat]);
  });
  useEffect(() => {
    return () => {
      socket.off('message_send');
    };
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: currentChat.name,
      headerTitleStyle: {fontSize: 17},
      // headerTitleAlign: 'center',
      headerStyle: {height: 85},
      headerLeftContainerStyle: {
        borderRadius: 20,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: '5%',
      },
    });
  }, []);
  useEffect(() => {
    getChatId();
  }, [currentChat]);
  const getChatId = async () => {
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const session = JSON.parse(data1);
    const details = JSON.parse(data);
    setUser(details);
    setUserSession(session);
    var config = {
      method: 'get',
      url: `${baseUrl}get_chat_messages_by_user_id/${currentChat.id}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };
    axios(config)
      .then(function (response) {
        HideLoading();
        console.log('The currentChat is ', response.data.data);
        // getData();
        setChats(response.data.data.messages);
      })
      .catch(function (error) {
        HideLoading;
        console.log(error.response.data);
      });
  };
  const getData = async () => {
    const data = await AsyncStorage.getItem('user');
    const data1 = await AsyncStorage.getItem('session');
    const session = JSON.parse(data1);
    const details = JSON.parse(data);
    console.log('The user data is as follows=======>', data);
    setUser(details);
    setUserSession(session);
    console.log('The current chat is ', route.params.currentChat);
    var config = {
      method: 'get',
      url: `${baseUrl}get_chat_messages/${currentChat.chatId}`,
      headers: {
        app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
        session_token: session.session_key,
      },
    };
    axios(config)
      .then(function (response) {
        HideLoading();
        console.log('The currentChat is ', currentChat);
        console.log(
          'The Chats from the api are as follows',
          response.data.data.messages,
        );
        setChats(response.data.data.messages);
      })
      .catch(function (error) {
        HideLoading;
        console.log(error.response.data);
      });
  };
  const sendMessage = () => {
    if (message != '') {
      setHeight(hp('5%'));
      if (currentChat.chatId == null) {
        let config = {
          method: 'post',
          url: `${baseUrl}add_message_by_user`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: userSession.session_key,
          },
          data: {
            message: message,
            user_id: currentChat.id,
          },
        };

        axios(config)
          .then(response => {
            setMessage('');
            setCurrentChat({
              ...currentChat,
              chatId: response.data.data.message.chat_id,
            });
            setRefresh(!refresh);
          })
          .catch(error => {
            console.log('the user session is', userSession.session_key);
            setMessage('');
            console.log('error', error.response.data);
            alert('Please Check your network connection');
          });
      } else {
        var config = {
          method: 'post',
          url: `${baseUrl}add_message_by_chat`,
          headers: {
            app_key: 'IAhnY5lVsCmm+dEKV3VPMBPiqN4NzIsh7CGK2VpKJc=',
            session_token: userSession.session_key,
          },
          data: {
            message: message,
            chat_id: currentChat.chatId,
          },
        };
        axios(config)
          .then(function (response) {
            socket.emit('message_get', {
              user_id: currentChat.id,
              other_name: user.name,
              photo: user.image,
              message: message,
              other_id: user.id,
              chat_id: currentChat.chatId,
            });
          })
          .catch(function (error) {
            setMessage('');
            alert('Please Check your network connection');
            console.log(error.response.data);
          });
      }
    }
  };
  function handleInfinityScroll(event) {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
  const ShowLoading = () => {
    setLoading(true);
  };
  const HideLoading = () => {
    setLoading(false);
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

      {rating ? (
        <View
          style={{
            backgroundColor: '#40AE49',
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 999,
            borderRadius: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RatingScreen', {data: currentChat});
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: RFValue(14),
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              Rate Your Experience
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView
        onScroll={e => {
          if (handleInfinityScroll(e)) {
            setRating(true);
          } else {
            setRating(false);
          }
        }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {chats.map((item, index) => {
          // console.log('the item is', item);
          if (item.sender?.id == currentChat.senderId) {
            return (
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <>
                  <View
                    style={{
                      backgroundColor: colors.green,
                      marginVertical: 5,
                      width: '80%',
                      borderRadius: 15,
                      padding: 15,
                      borderBottomRightRadius: 3,
                    }}>
                    <Text style={{color: '#fff'}}>{item.message}</Text>
                  </View>
                  <View style={{justifyContent: 'flex-end'}}>
                    {currentChat.chatImage ? (
                      <Image
                        source={{uri: `${imageUrl}${currentChat.chatImage}`}}
                        resizeMode="cover"
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: '#000',
                          borderRadius: 25,
                          marginBottom: 15,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/images/User.png')}
                        resizeMode="cover"
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: '#000',
                          borderRadius: 25,
                          marginBottom: 15,
                        }}
                      />
                    )}
                  </View>
                  {console.log('the user is ', currentChat.image)}
                </>
              </View>
            );
          } else {
            return (
              <View style={{flexDirection: 'row', marginRight: 0}}>
                <>
                  <View style={{justifyContent: 'flex-end'}}>
                    {currentChat.image ? (
                      <Image
                        source={{uri: `${imageUrl}${currentChat.image}`}}
                        resizeMode="cover"
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: '#000',
                          borderRadius: 25,
                          marginBottom: 15,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/images/User.png')}
                        resizeMode="cover"
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: '#000',
                          borderRadius: 25,
                          marginBottom: 15,
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      marginVertical: 5,
                      width: '80%',
                      borderRadius: 15,
                      padding: 15,
                      borderBottomLeftRadius: 3,
                    }}>
                    <Text style={{color: '#fff'}}>{item.message}</Text>
                  </View>
                </>
              </View>
            );
          }
        })}
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          bottom: 0,
          marginVertical: 10,
          marginLeft: 0,
          marginRight: 0,
          height: height,
        }}>
        <View
          style={{
            flex: 3,
            height: Math.max(height, hp('5%')),
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#f0f0f0',
              borderRadius: 10,
              color: '#000',
            }}
            value={message}
            onChangeText={txt => {
              setMessage(txt);
            }}
            onContentSizeChange={event => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
            multiline={true}
          />
        </View>

        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              width: wp('10%'),
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              sendMessage();
            }}>
            <Image source={require('../assets/images/Send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
});
// import React, { Component } from "react";
// import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { Dimensions } from "react-native";
// import io from "socket.io-client";
// import Contacts from 'react-native-contacts';
// import { AskForPermissions } from "./utils/AskForPermissions";
// import AllContacts from "./screens/contacts/Contacts";
// import LinearGradient from 'react-native-linear-gradient';
// import Profile from "./screens/Profile";
// import Settings from "./screens/Settings";
// import CustomDrawer from "./components/CustomDrawer";
// import ChatNavigation from "./screens/ChatNavigation";
// import { BASE_URL } from "./utils/Url";
// import Chats from "./screens/chats/Chats";

// const Drawer = createDrawerNavigator();
// const StartScreen = () => {
//   // const isOpen: boolean = useIsDrawerOpen()
//   // constructor(props) {
//   //   super(props);
//   //
//   //   this.state = {
//   //     chatMessage: "",
//   //     chatMessages: []
//   //   };
//   // }
//   //
//   // readContacts = async () => {
//   //   let granted = await AskForPermissions('contacts');
//   //
//   //   if(granted) {
//   //     try {
//   //       Contacts.getAll()
//   //         .then((contacts) => {
//   //           contacts.map(contact=>(
//   //             console.log('name => ', contact.displayName, 'phone => ', contact.phoneNumbers[0].number.replace(/-|\s/g,""))
//   //           ))
//   //         })
//   //         .catch((e) => { console.log(e) })
//   //     } catch (e) {
//   //       console.log(e)
//   //     }
//   //   }
//   // }
//   //
//   // componentDidMount() {
//   //   // this.socket = io(BASE_URL);
//   //   // this.socket.on("chat message", msg => {
//   //   //   this.setState({ chatMessages: [...this.state.chatMessages, msg] });
//   //   // });
//   //
//   //   this.readContacts()
//   // }

//   // render() {
//     return (
//       // console.log('drawer = ', isOpen),
//       <React.Fragment>
//         {/*<LinearGradient style={{flex: 1}} colors={['#6A60EE', '#56EDFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>*/}
//         <NavigationContainer independent={true}>
//           <Drawer.Navigator initialRouteName="ChatNavigation" drawerStyle={{backgroundColor: 'transparent'}} overlayColor={"transparent"} drawerContent={(props) => <CustomDrawer {...props} />}>
//             <Drawer.Screen name="ChatNavigation" component={ChatNavigation} />
//             <Drawer.Screen name="Contacts" component={AllContacts} />
//             <Drawer.Screen name="Profile" component={Profile} />
//             <Drawer.Screen name="Settings" component={Settings} />
//           </Drawer.Navigator>
//         </NavigationContainer>
//         {/*</LinearGradient>*/}
//       </React.Fragment>
//     );
//   // }
// }

// export default StartScreen;

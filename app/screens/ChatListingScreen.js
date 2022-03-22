import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SearchField from '../components/SearchField';
import ChatListItem from '../components/ChatListItem';
import Screen from '../components/Screen';
function ChatListingScreen(props) {
  const data = [
    {
      name: 'Dr Haris Khalid',
      designation: 'Therapist',
      rating: 5,
      reviews: 20,
      message: 'How are you and whats you doing',
    },
    {
      name: 'Dr Sharjeel',
      designation: 'Therapist',
      rating: 2,
      reviews: 25,
      message: 'How are you and whats you doing',
    },
    {
      name: 'Dr Fahad',
      designation: 'Therapist',
      rating: 1,
      reviews: 23,
      message: 'How are you and whats you doing',
    },
    {
      name: 'Dr Tahir',
      designation: 'Therapist',
      rating: 2,
      reviews: 50,
      message: 'How are you and whats you doing',
    },
    {
      name: 'Dr Haneef Khan',
      designation: 'Therapist',
      rating: 3,
      reviews: 10,
      message: 'How are you and whats you doing',
    },
    {
      name: 'Dr Martin Harper',
      designation: 'Therapist',
      rating: 4,
      reviews: 20,
      message: 'How are you and whats you doing',
    },
  ];

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

export default ChatListingScreen;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

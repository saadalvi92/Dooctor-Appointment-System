import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFValue} from 'react-native-responsive-fontsize';
function MenuScreen(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userData = await AsyncStorage.getItem('user');
    setUser(JSON.parse(userData));
  };
  return (
    <Screen style={styles.container}>
      {user.type == 'therapist' ? (
        <TouchableOpacity
          style={{
            margin: '5%',
            borderBottomWidth: 1,
            flexDirection: 'row',
            borderBottomColor: '#bad1dd',
          }}
          onPress={() => {
            props.navigation.navigate('StatisticsScreen');
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: RFValue(15),
              fontWeight: 'bold',
              marginLeft: '2%',
              marginBottom: '2%',
            }}>
            Statistics
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              position: 'absolute',
              right: 0,
            }}>
            <Icon
              name={'chevron-right'}
              size={24}
              color={'black'}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
        </TouchableOpacity>
      ) : user.type == 'practice' ? (
        <>
          <TouchableOpacity
            style={{
              margin: '5%',
              borderBottomWidth: 1,
              flexDirection: 'row',
              borderBottomColor: '#b9d1dd',
            }}
            onPress={() => {
              props.navigation.navigate('RevenueScreen');
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: RFValue(15),
                fontWeight: 'bold',
                marginLeft: '2%',
                marginBottom: '2%',
              }}>
              Revenue
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 0,
              }}>
              <Icon
                name={'chevron-right'}
                size={24}
                color={'black'}
                style={{alignSelf: 'flex-end'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: '5%',
              borderBottomWidth: 1,
              flexDirection: 'row',
              borderBottomColor: '#b9d1dd',
            }}
            onPress={() => {
              props.navigation.navigate('PracticeStatisticsScreen');
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: RFValue(15),
                fontWeight: 'bold',
                marginLeft: '2%',
                marginBottom: '2%',
              }}>
              Statistics
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 0,
              }}>
              <Icon
                name={'chevron-right'}
                size={24}
                color={'black'}
                style={{alignSelf: 'flex-end'}}
              />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={{
            margin: '5%',
            borderBottomWidth: 1,
            flexDirection: 'row',
            borderBottomColor: '#b9d1dd',
          }}
          onPress={() => {
            props.navigation.navigate('PlaneofCareListing');
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: RFValue(15),
              fontWeight: 'bold',
              marginLeft: '2%',
              marginBottom: '2%',
            }}>
            Plan of Care
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              position: 'absolute',
              right: 0,
            }}>
            <Icon
              name={'chevron-right'}
              size={24}
              color={'black'}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          margin: '5%',
          borderBottomWidth: 1,
          flexDirection: 'row',
          borderBottomColor: '#b9d1dd',
        }}
        onPress={async () => {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('session');
          await AsyncStorage.removeItem('creds');
          props.route.params.setState(false);
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: RFValue(15),
            fontWeight: 'bold',
            marginLeft: '2%',
            marginBottom: '2%',
          }}>
          Signout
        </Text>
        <View
          style={{
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            position: 'absolute',
            right: 0,
          }}></View>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: '10%'},
});

export default MenuScreen;

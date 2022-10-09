import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnlineCulsentency from '../screens/OnlineCulsentency';
import InPersonAppointment from '../screens/InPersonAppointment';
import AppText from '../components/Text';
import colors from '../config/colors';
import Screen from '../components/Screen';
import ClientChat from '../screens/Therapist/ClientChat';
import PracticeChat from '../screens/Therapist/PracticeChat';
import TherapistChat from '../screens/Therapist/TherapistChat';
const Tab = createMaterialTopTabNavigator();
function TopTabNavigationAppointments(props) {
  const user = props.route.params;
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_text}>
          <AppText style={{color: colors.dark, fontSize: 24}}></AppText>
        </View>
      </View>

      {user.type == 'client' ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              marginVertical: 10,
              marginBottom: 0,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              zIndex: 9,
              elevation: 0,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.green,
              height: 4,
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#304659',
            },
          }}>
          <Tab.Screen name="Practice" component={PracticeChat} />
          <Tab.Screen name="Therapists" component={TherapistChat} />
        </Tab.Navigator>
      ) : user.type == 'therapist' ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              marginVertical: 10,
              marginBottom: 0,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              zIndex: 9,
              elevation: 0,
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'none',
            },
          }}>
          <Tab.Screen name="Clients" component={ClientChat} />
          <Tab.Screen name="Practice" component={PracticeChat} />
        </Tab.Navigator>
      ) : user.type == 'practice' ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              marginVertical: 10,
              marginBottom: 0,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              zIndex: 9,
              elevation: 0,
            },
            tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold'},
          }}>
          <Tab.Screen name="Clients" component={ClientChat} />
          <Tab.Screen name="Therapists" component={TherapistChat} />
        </Tab.Navigator>
      ) : null}
    </Screen>
  );
}

export default TopTabNavigationAppointments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 30,
    paddingBottom: 3,
  },
  header_text: {
    width: '58%',
  },
  bell_container: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 7,
  },
  bell_icon: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff',
  },
});

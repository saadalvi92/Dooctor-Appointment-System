import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Screen from '../components/Screen';
import Client from '../screens/Practice/Client';
import Therapist from '../screens/Practice/Therapist';
import AppText from '../components/Text';
import colors from '../config/colors';
const Tab = createMaterialTopTabNavigator();
function PracticeTopTabNavigator(props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_text}>
          <AppText style={{color: colors.dark, fontSize: 24}}></AppText>
        </View>
      </View>
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
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        }}>
        <Tab.Screen name="Clients" component={Client} />
        <Tab.Screen name="Therapists" component={Therapist} />
      </Tab.Navigator>
    </Screen>
  );
}

export default PracticeTopTabNavigator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

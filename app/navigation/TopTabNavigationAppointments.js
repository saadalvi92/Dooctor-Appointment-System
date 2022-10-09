import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnlineCulsentency from '../screens/OnlineCulsentency';
import InPersonAppointment from '../screens/InPersonAppointment';
import AppText from '../components/Text';
import colors from '../config/colors';
import Screen from '../components/Screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Tab = createMaterialTopTabNavigator();
function TopTabNavigationAppointments(props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_text}>
          <Text
            style={{
              color: colors.dark,
              fontSize: RFValue(24),
              fontWeight: '500',
            }}>
            {props.route.params.type == 'practice'
              ? 'Accounts'
              : props.route.params.type == 'therapist'
              ? 'Case load'
              : 'Appointments'}
          </Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: hp('8%'),
            marginBottom: 0,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            zIndex: 0,
            elevation: 0,
          },

          tabBarLabelStyle: {fontSize: RFValue(13), fontWeight: 'bold'},
        }}>
        <Tab.Screen
          name="Video Appointment"
          component={OnlineCulsentency}
          options={{
            tabBarIndicatorStyle: {
              backgroundColor: colors.primary,
              height: 4,
            },
          }}
        />
        <Tab.Screen
          name="In Person Appointment"
          component={InPersonAppointment}
          options={{
            tabBarIndicatorStyle: {
              backgroundColor: colors.green,
              height: 4,
            },
          }}
        />
      </Tab.Navigator>
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
    padding: 30,
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

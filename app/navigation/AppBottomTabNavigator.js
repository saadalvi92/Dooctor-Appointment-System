import * as React from 'react';
import {Image, View, Text} from 'react-native';
// import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// import {MaterialIcons, FontAwesome5} from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppointmentNavigator from './AppointmentNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../config/colors';
import {Button, StyleSheet} from 'react-native';
import HomeNavigator from './HomeNavigator';
import ChatNavigation from './ChatNavigation';
import PlaneofCareNavigation from './PlaneofCareNavigation';
import ChatTopTabNavigation from './ChatTopTabNavigation';
import ChatStackNavigator from './ChatStackNavigator';
import TherapistProfile from '../screens/Therapist/TherapistProfile';
import PracticeProfile from '../screens/Practice/PracticeProfile';
const Tab = createBottomTabNavigator();
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TouchableHighlight} from 'react-native-gesture-handler';
export default function App({setUser, state}) {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#dceaf4',
            height: 90,
          },
          tabBarBadgeStyle: {top: 12},
          tabBarLabelStyle: {bottom: 15},
          tabBarActiveTintColor: colors.primary,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View style={styles.mainStyles}>
                  <Image
                    source={require('../assets/images/HomeActive.png')}
                    width={16.82}
                    height={18.22}
                  />
                </View>
              ) : (
                <Image
                  source={require('../assets/images/HomeUnActive.png')}
                  width={16.82}
                  height={18.22}
                />
              ),
          }}
          name="Home"
          component={HomeNavigator}
          initialParams={state}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              navigation.navigate(route.name);
            },
          })}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size, focused}) =>
              state.type == 'practice' ? (
                focused ? (
                  <View style={styles.mainStyles}>
                    <Image
                      source={require('../assets/images/SettingActive.png')}
                      width={19}
                      height={19}
                    />
                  </View>
                ) : (
                  <Image
                    source={require('../assets/images/SettingInActive.png')}
                    width={19}
                    height={19}
                  />
                )
              ) : state.type == 'Therapist' ? (
                focused ? (
                  <View style={styles.mainStyles}>
                    <Image
                      source={require('../assets/images/AppointmentActive.png')}
                      width={19}
                      height={19}
                    />
                  </View>
                ) : (
                  <Image
                    source={require('../assets/images/AppointmentUnActive.png')}
                    width={19}
                    height={19}
                  />
                )
              ) : focused ? (
                <View style={styles.mainStyles}>
                  <Image
                    source={require('../assets/images/AppointmentActive.png')}
                    width={19}
                    height={19}
                  />
                </View>
              ) : (
                <Image
                  source={require('../assets/images/AppointmentUnActive.png')}
                  width={19}
                  height={19}
                />
              ),
          }}
          name={
            state.type == 'practice'
              ? 'Accounts'
              : state.type == 'therapist'
              ? 'Case load'
              : 'Appointments'
          }
          component={AppointmentNavigator}
          initialParams={state}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              // navigation.popToTop();
              navigation.navigate(route.name);
            },
          })}
        />
        <Tab.Screen
          options={{
            tabBarVisible: false,
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View style={styles.mainStyles}>
                  <Image
                    source={require('../assets/images/ChatActive.png')}
                    width={24}
                    height={24}
                  />
                  {/* <View
                    style={{
                      position: 'absolute',
                      padding: 2,
                      paddingHorizontal: 6,
                      backgroundColor: 'red',
                      borderRadius: 20,
                      right: 16,
                      top: 8,
                    }}>
                    <Text style={{color: '#fff', fontSize: 12}}>2</Text>
                  </View> */}
                </View>
              ) : (
                <View
                  style={[styles.mainStyles, {borderTopColor: 'transparent'}]}>
                  <Image
                    source={require('../assets/images/ChatUnActive.png')}
                    width={24}
                    height={24}
                  />
                  {/* <View
                    style={{
                      position: 'absolute',
                      padding: 2,
                      paddingHorizontal: 6,
                      backgroundColor: 'red',
                      borderRadius: 20,
                      right: 18,
                      top: 8,
                    }}>
                    <Text style={{color: '#fff', fontSize: 12}}>2</Text>
                  </View> */}
                </View>
              ),
          }}
          name="Chat"
          component={ChatStackNavigator}
          initialParams={state}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              // navigation.popToTop();
              navigation.navigate(route.name);
            },
          })}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <View style={styles.mainStyles}>
                  <Image
                    source={require('../assets/images/Fill.png')}
                    width={24}
                    height={24}
                  />
                </View>
              ) : (
                <View
                  style={[styles.mainStyles, {borderTopColor: 'transparent'}]}>
                  <Image
                    source={require('../assets/images/ProfileUnActive.png')}
                    width={24}
                    height={24}
                  />
                </View>
              ),
          }}
          name="Profile"
          initialParams={{setState: setUser}}
          component={
            state.type == 'therapist'
              ? TherapistProfile
              : state.type == 'practice'
              ? PracticeProfile
              : ProfileScreen
          }
          listeners={({navigation, route}) => ({
            tabPress: e => {
              // navigation.popToTop();
              navigation.navigate(route.name);
            },
          })}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <MaterialIcons
                name="menu"
                size={size}
                color={color}
                style={focused && styles.mainStyles}
              />
            ),
          }}
          name="Menu"
          component={PlaneofCareNavigation}
          initialParams={{setState: setUser}}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              // navigation.popToTop();
              navigation.navigate(route.name);
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  mainStyles: {
    color: colors.primary,
    borderTopWidth: 4,
    borderTopColor: colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});

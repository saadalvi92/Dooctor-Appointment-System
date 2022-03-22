import React, {useEffect, useState, useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import TherapistListingScreen from '../screens/TherapistListingScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import AppointmentDetails from '../screens/AppointmentDetails';
import ScheduleCalendarScreen from '../screens/ScheduleCalendarScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../config/colors';
import SlotSelectingScreen from '../screens/SlotSelectingScreen';
import PaymentPage from '../screens/PaymentPage';
import TherapistinPracticeScreen from '../screens/TherapistinPracticeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HomeDashboard from '../screens/Therapist/HomeDashboard';
import Availablity from '../screens/Therapist/Availablity';
import practiceHomeDashboard from '../screens/Practice/HomeDashboard';
import SearchListing from '../screens/Practice/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import RatingScreen from '../screens/RatingScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();
const headerstyle = {
  headerShown: true,
  headerTitle: '',
  headerStyle: {height: 100},
  headerLeftContainerStyle: {
    borderRadius: 20,
    width: 50,
    height: 50,
    shadowRadius: 2.65,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 20,
  },
  headerRightContainerStyle: {
    borderRadius: 20,
    width: 50,
    height: 50,
    marginRight: '5%',
    marginTop: 20,
    marginLeft: 20,
  },
};
function HomeNavigator({navigation, route}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log('The route is ', routeName);
    if (routeName === 'ChatScreen') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#dceaf4',
          height: 90,
        },

        tabBarBadgeStyle: {top: 12},
        tabBarLabelStyle: {bottom: 15},
        tabBarActiveTintColor: colors.primary,
      });
    }
  }, [navigation, route]);
  if (route.params.type == 'therapist') {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeDashboard} />
        <Stack.Screen
          name="Availablity"
          component={Availablity}
          options={headerstyle}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center', marginBottom: 15},
            headerStyle: {height: 100},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center'},
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.27,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
              elevation: 6,
              marginTop: 20,
              marginLeft: 20,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="TherapistListingScreen"
          component={TherapistListingScreen}
        />
        <Stack.Screen
          name="AppointmentScreen"
          component={AppointmentScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="TherapistinPracticeScreen"
          component={TherapistinPracticeScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="ScheduleCalendarScreen"
          component={ScheduleCalendarScreen}
          options={{
            ...headerstyle,
          }}
        />
        <Stack.Screen
          name="SlotSelectingScreen"
          component={SlotSelectingScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={headerstyle}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
      </Stack.Navigator>
    );
  } else if (route.params.type == 'practice') {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={practiceHomeDashboard} />
        <Stack.Screen name="SearchListing" component={SearchListing} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center', marginBottom: 15},
            headerStyle: {height: 100},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center', marginBottom: 15},
            headerStyle: {height: 100},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}
        />
        <Stack.Screen
          name="Availablity"
          component={Availablity}
          options={headerstyle}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center'},
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="TherapistListingScreen"
          component={TherapistListingScreen}
        />
        <Stack.Screen
          name="AppointmentScreen"
          component={AppointmentScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="TherapistinPracticeScreen"
          component={TherapistinPracticeScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="ScheduleCalendarScreen"
          component={ScheduleCalendarScreen}
          options={{
            ...headerstyle,
          }}
        />
        <Stack.Screen
          name="SlotSelectingScreen"
          component={SlotSelectingScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={headerstyle}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center'},
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="TherapistListingScreen"
          component={TherapistListingScreen}
        />
        <Stack.Screen
          name="AppointmentScreen"
          component={AppointmentScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="TherapistinPracticeScreen"
          component={TherapistinPracticeScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
            headerRightContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              marginRight: '5%',
              marginTop: 20,
              marginLeft: 20,
            },
          }}
        />
        <Stack.Screen
          name="ScheduleCalendarScreen"
          component={ScheduleCalendarScreen}
          options={{
            ...headerstyle,
          }}
        />
        <Stack.Screen
          name="SlotSelectingScreen"
          component={SlotSelectingScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={headerstyle}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeNavigator;

import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopTabNavigationAppointments from './TopTabNavigationAppointments';
import AppointmentDetails from '../screens/AppointmentDetails';
import MoodCalender from '../screens/Therapist/MoodCalender';
import TherapistPlaneofCare from '../screens/Therapist/TherapistPlaneofCare';
import TreatmentPlane from '../screens/Therapist/TreatmentPlane';
import PracticeTopTabNavigator from './PracticeTopTabNavigator';
import TherapistAccountScreen from '../screens/Practice/TherapistAccountScreen';
import ClientAccountScreen from '../screens/Practice/ClientAccountScreen';
import RatingScreen from '../screens/RatingScreen';
import ChatScreen from '../screens/ChatScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import colors from '../config/colors';
import ScheduleCalendarScreen from '../screens/ScheduleCalendarScreen';
import SlotSelectingScreen from '../screens/SlotSelectingScreen';
import PaymentPage from '../screens/PaymentPage';
const Stack = createStackNavigator();

const headerstyle = {
  headerShown: true,
  headerTitle: '',
  headerStyle: {height: 0},
  headerLeftContainerStyle: {
    borderRadius: 20,
    width: 50,
    height: 50,
    borderColor: '#e8f1f4',
    borderWidth: 1,
    shadowRadius: 2.65,
    backgroundColor: '#fff',
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
function AppointmentNavigator({navigation, route}) {
  const user = route.params;
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log('The route is ', routeName);
    if (routeName === 'ChatScreen') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
      console.log('The current screen is chatscreen');
    } else {
      console.log('The current screen is not chatscreen');
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
  if (user.type == 'practice')
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="PracticeTopTabNavigator">
        <Stack.Screen
          name="PracticeTopTabNavigator"
          component={PracticeTopTabNavigator}
        />
        <Stack.Screen
          name="TherapistAccountScreen"
          component={TherapistAccountScreen}
          options={headerstyle}
        />
        <Stack.Screen
          name="ClientAccountScreen"
          component={ClientAccountScreen}
          options={headerstyle}
        />
      </Stack.Navigator>
    );
  else
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="TopTabNavigationAppointments">
        <Stack.Screen
          name="TopTabNavigationAppointments"
          component={TopTabNavigationAppointments}
          initialParams={user}
        />
        <Stack.Screen
          name="ScheduleCalendarScreen"
          component={ScheduleCalendarScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 100},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              borderColor: '#e8f1f4',
              borderWidth: 1,
              shadowRadius: 2.65,
              backgroundColor: '#fff',
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
          name="SlotSelectingScreen"
          component={SlotSelectingScreen}
          options={{
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
          }}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={{
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
          }}
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
          name="RatingScreen"
          component={RatingScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {justifyContent: 'center', marginBottom: 15},
            headerStyle: {height: 0},
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
          name="AppointmentDetails"
          component={AppointmentDetails}
          options={headerstyle}
        />
        <Stack.Screen
          name="MoodCalender"
          component={MoodCalender}
          options={headerstyle}
        />
        <Stack.Screen
          name="TherapistPlaneofCare"
          component={TherapistPlaneofCare}
          options={headerstyle}
        />
        <Stack.Screen
          name="TreatmentPlane"
          component={TreatmentPlane}
          options={headerstyle}
        />
      </Stack.Navigator>
    );
}

export default AppointmentNavigator;

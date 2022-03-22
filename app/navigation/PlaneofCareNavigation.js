import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import colors from '../config/colors';
import PlaneofCareListing from '../screens/PlaneofCareListing';
import PlaneofCare from '../screens/PlaneofCare';
import MenuScreen from '../screens/MenuScreen';
import NotificationScreen from '../screens/NotificationScreen';
import StatisticsScreen from '../screens/Therapist/StatisticsScreen';
import RevenueScreen from '../screens/Practice/RevenueScreen';
import TopTabStatistics from './TopTabStatistics';
const Stack = createStackNavigator();

function PlaneofCareNavigation(props) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    console.log('The route is ', routeName);
    if (routeName != 'MenuStack' && routeName != undefined) {
      props.navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      props.navigation.setOptions({
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
  }, [props.navigation, props.route]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MenuStack"
        component={MenuScreen}
        initialParams={{
          setState: () => {
            props.route.params.setState(false);
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="PlaneofCareListing"
        component={PlaneofCareListing}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {justifyContent: 'center', marginBottom: 15},
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
        }}
      />
      <Stack.Screen
        name="PlaneofCare"
        component={PlaneofCare}
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
        }}
      />
      <Stack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {justifyContent: 'center'},
          headerStyle: {height: 0},
          headerLeftContainerStyle: {
            borderRadius: 20,
            width: 50,
            height: 50,
            borderColor: '#e8f1f4',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginTop: 20,
            marginLeft: 20,
          },
        }}
      />
      <Stack.Screen
        name="RevenueScreen"
        component={RevenueScreen}
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
            borderColor: '#e8f1f4',
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 20,
          },
        }}
      />
      <Stack.Screen
        name="PracticeStatisticsScreen"
        component={TopTabStatistics}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {justifyContent: 'center'},
          headerStyle: {height: 0},
          headerLeftContainerStyle: {
            borderRadius: 20,
            width: 50,
            height: 50,
            borderColor: '#e8f1f4',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginTop: 20,
            marginLeft: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default PlaneofCareNavigation;

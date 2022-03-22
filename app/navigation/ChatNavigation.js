import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatListingScreen from '../screens/ChatListingScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import colors from '../config/colors';
import RatingScreen from '../screens/RatingScreen';
const Stack = createStackNavigator();

function ChatNavigation({navigation, route}) {
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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatListingScreen" component={ChatListingScreen} />
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
    </Stack.Navigator>
  );
}

export default ChatNavigation;

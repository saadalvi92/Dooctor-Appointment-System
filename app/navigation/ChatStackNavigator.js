import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatTopTabNavigation from './ChatTopTabNavigation';
import ChatScreen from '../screens/ChatScreen';
import RatingScreen from '../screens/RatingScreen';
import colors from '../config/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();
const headerstyle = {
  headerShown: true,
  headerTitle: '',
  headerStyle: {height: 30},
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
  headerRightContainerStyle: {
    borderRadius: 20,
    width: 50,
    height: 50,
    marginRight: '5%',
    marginTop: 20,
    marginLeft: 20,
  },
};
function ChatStackNavigator({navigation, route}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ChatScreen' || routeName === 'RatingScreen') {
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
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChatTopTabNavigation">
      <Stack.Screen
        name="ChatTopTabNavigation"
        component={ChatTopTabNavigation}
        initialParams={route.params}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={headerstyle}
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

export default ChatStackNavigator;

import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native';
import {
  SelectionOfUserScreen,
  LoginOrSignUpScreen,
  LoginScreen,
  SuccessfulPasswordChangeScreen,
  SignUpScreen,
} from '../screens/AccountScreens';
import InformationScreen from '../screens/AccountScreens/InformationScreen';
import InformationScreenTherapist from '../screens/AccountScreens/InformationScreenTherapist';
import InformationScreenPractice from '../screens/AccountScreens/InformationScreenPractice';
import ForgotPass from '../screens/AccountScreens/ForgotPass';
import ForgotPassEmail from '../screens/AccountScreens/ForgotPassEmail';
import OTP from '../screens/AccountScreens/OTP';
const Stack = createStackNavigator();

function AccountNavigator({setUser, setState}) {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // initialRouteName={'SelectionOfUserScreen'}
      >
        <Stack.Screen
          name="SelectionOfUserScreen"
          component={SelectionOfUserScreen}
          initialParams={{setState: setUser, setUser: setState}}
        />
        <Stack.Screen
          name="LoginOrSignUpScreen"
          component={LoginOrSignUpScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{setState: setUser, setUser: setState}}
        />
        <Stack.Screen
          name="SuccessfulPasswordChangeScreen"
          component={SuccessfulPasswordChangeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,

              backgroundColor: '#fff',

              marginTop: 20,
              marginLeft: 20,
              borderColor: '#e8f1f4',
              borderWidth: 1,
            },
          }}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              marginTop: 20,
              marginLeft: 20,
              borderColor: '#e8f1f4',
              borderWidth: 1,
            },
          }}
          name="ForgotPass"
          component={ForgotPass}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              marginTop: 20,
              marginLeft: 20,
              borderColor: '#e8f1f4',
              borderWidth: 1,
            },
          }}
          name="ForgotPassEmail"
          component={ForgotPassEmail}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              marginTop: 20,
              marginLeft: 20,
              borderColor: '#e8f1f4',
              borderWidth: 1,
            },
          }}
          name="OTP"
          component={OTP}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderColor: '#e8f1f4',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}
          name="InformationScreen"
          component={InformationScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {height: 0},
            headerLeftContainerStyle: {
              borderRadius: 20,
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderColor: '#e8f1f4',
              borderWidth: 1,
              marginTop: 20,
              marginLeft: 20,
            },
          }}
          name="InformationScreenPractice"
          component={InformationScreenPractice}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
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
          name="InformationScreenTherapist"
          component={InformationScreenTherapist}
        />
      </Stack.Navigator>
    </>
  );
}

export default AccountNavigator;

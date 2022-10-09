import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppBottomTabNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AccountNavigator from "./app/navigation/AccountNavigator";
import { StatusBar } from "react-native";
export default function App() {
  const [user, setUser] = useState(false);
  const [state, setState] = useState({});

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle={"dark-content"}
      />

      {user ? (
        <AppNavigator setUser={setUser} setState={setState} state={state} />
      ) : (
        <AccountNavigator setUser={setUser} setState={setState} />
      )}
    </NavigationContainer>
  );
}

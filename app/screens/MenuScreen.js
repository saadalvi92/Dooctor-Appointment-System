import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
function MenuScreen(props) {
  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        style={{
          margin: "5%",
          borderBottomWidth: 1,
          flexDirection: "row",
          borderBottomColor: "#b9d1dd",
        }}
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("session");
          await AsyncStorage.removeItem("creds");
          props.route.params.setState(false);
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: RFValue(15),
            fontWeight: "bold",
            marginLeft: "2%",
            marginBottom: "2%",
          }}
        >
          Signout
        </Text>
        <View
          style={{
            alignItems: "flex-end",
            alignSelf: "flex-end",
            position: "absolute",
            right: 0,
          }}
        ></View>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: "10%" },
});

export default MenuScreen;

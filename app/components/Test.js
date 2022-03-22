import React, { useState, useRef } from "react";
import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const App = () => {
  const [phoneNumber, setphoneNumber] = useState("");
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        withShadow
        autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        onChangeFormattedText={(text) => {
          setphoneNumber(text);
        }}
      />
      <Pressable style={styles.button} onPress={() => buttonPress()}>
        <Text style={styles.continueText}>Get Phone Number</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneContainer: {
    width: "75%",
    height: 50,
  },
  button: {
    marginTop: 30,
    width: "75%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  textInput: {
    paddingVertical: 0,
    backgroundColor: "white",
  },
});

export default App;

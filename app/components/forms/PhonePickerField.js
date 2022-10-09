import React, { useState, useRef } from "react";
import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import colors from "../../config/colors";

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
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        onChangeFormattedText={(text) => {
          setphoneNumber(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  phoneContainer: {
    width: "100%",
    height: 50,
  },

  textInput: {
    paddingVertical: 0,
    backgroundColor: colors.white,
  },
});

export default App;

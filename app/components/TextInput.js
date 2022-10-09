import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet, Animated, Image } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {MaterialCommunityIcons} from 'react-native-vector-icons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fontisto from "react-native-vector-icons/FontAwesome5";
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

function AppTextInput({
  eye = false,
  type,
  width = "100%",
  validEmail = false,
  setData,
  handleChangeText,
  location,
  iconAlign = "right",
  styles = {
    borderWidth: 1,
    borderColor: defaultStyles.colors.lightGray,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "transparent",
    color: "#ddd",
  },
  Address = false,
  price = false,
  ...otherProps
}) {
  const [eyeIcon, setEyeIcon] = useState(eye);

  const toggleEyeIcon = () => {
    setEyeIcon(!eyeIcon);
  };

  return (
    <View
      style={[
        styles,
        {
          width,
          flexDirection: iconAlign === "right" ? "row" : "row-reverse",
          marginBottom: 0,
        },
      ]}
    >
      {price && (
        <View style={{ justifyContent: "center" }}>
          <Fontisto
            style={{
              alignSelf: "flex-end",
              justifyContent: "center",
            }}
            name={"pound-sign"}
            size={15}
            color={colors.dark}
          />
        </View>
      )}
      {Address && (
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Image source={require("../assets/images/Adress.png")} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <TextInput
          selectionColor={colors.primary}
          placeholderTextColor={defaultStyles.colors.medium}
          style={{ color: "#000" }}
          secureTextEntry={eyeIcon ? true : false}
          onChangeText={(text) => handleChangeText(text)}
          {...otherProps}
        />
      </View>

      {eye && (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flex: 1,
          }}
          onPress={toggleEyeIcon}
        >
          {eyeIcon == true ? (
            <Image source={require("../assets/images/LoginEye.png")} />
          ) : (
            <Image source={require("../assets/images/EyeOpen.png")} />
          )}
        </TouchableOpacity>
      )}
      {validEmail && (
        <FadeInView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* <MaterialCommunityIcons
              style={{
                alignSelf: 'flex-end',
                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 80,
                justifyContent: 'center',
              }}
              name={'check'}
              size={25}
              color={'green'}
            /> */}
            <Image source={require("../assets/images/LoginCheck.png")} />
          </View>
        </FadeInView>
      )}

      {location && (
        <View>
          <MaterialCommunityIcons
            name={"map-marker"}
            size={25}
            color={defaultStyles.colors.medium}
            onPress={"toggleEyeIcon"}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: defaultStyles.colors.lightGray,
    flexDirection: "row",
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "transparent",
    color: "#ddd",
  },

  textInput: defaultStyles.text,
});

export default AppTextInput;

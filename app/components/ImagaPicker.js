import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";
import AppButton from "./Button";

function ImageInput() {
  const [image, setImage] = useState(null);

  // const requestPermission = async () => {
  //   const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!granted)
  //     return alert('Please give me permission to read data from storage.');
  // };

  useEffect(() => {
    // requestPermission();
  }, []);

  const handlePress = async () => {
    if (!image) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: selectImage },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      let option = {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: "photo",
        includeBase64: false,
        includeExtra,
      };
      const result = await ImagePicker.launchImageLibrary(option);
      if (!result.cancelled) setImage(result.uri);
    } catch (error) {
      console.log("Error while select image.", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!image && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <AppButton
        title={"Upload Your avatar"}
        onPress={handlePress}
        borderWidth={0.5}
        textColor={colors.black}
        fontWeight={"bold"}
        color={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    width: 150,
    height: 180,
    backgroundColor: colors.light,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;

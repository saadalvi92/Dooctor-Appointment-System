import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { fontSize } from "../config/fonts";
import AppText from "./Text";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
function HorizontalColorfulCardList({ Data, setState }) {
  const [List, setList] = useState(Data);

  const changeBackground = (item) => {
    let categesJSON = JSON.parse(JSON.stringify(List));

    for (let x = 0; x < categesJSON.length; x++) {
      if (categesJSON[x].id == item.id) {
        categesJSON[x].backgroundcolor = categesJSON[x].borderColor;
        setList(categesJSON);
      } else {
        categesJSON[x].backgroundcolor = "transparent";
        setList(categesJSON);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Moods
          List={List}
          changeBackground={changeBackground}
          setMood={(e) => {
            setState(e);
          }}
        />
      </ScrollView>
    </View>
  );
}

const Moods = ({ List, changeBackground, setMood }) => (
  <View style={styles.moods}>
    {List.map((item, key) => (
      <TouchableOpacity
        key={key}
        style={{
          width: wp("16.3%"),
          height: hp("10.2%"),
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderStyle: "dotted",
          borderColor: item.borderColor,
          backgroundColor: item.backgroundcolor,
          borderRadius: 5,
          marginHorizontal: 3,
        }}
        onPress={() => {
          changeBackground(item);
          setMood(item);
        }}
      >
        <AppText
          style={{
            fontWeight: "700",
            fontSize: RFValue(14),
            color:
              item.backgroundcolor == "transparent" ||
              item.backgroundcolor == "#fff"
                ? "#000"
                : "#fff",
          }}
        >
          {item.mood}
        </AppText>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  moods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HorizontalColorfulCardList;

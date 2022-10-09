import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import AppText from "./Text";
import { fontSize } from "../config/fonts";
import Calendar from "./Calendar";
import { heightPercentageToDP } from "react-native-responsive-screen";
function Cards({ Data, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <FlatList
          style={styles.description}
          data={Data}
          numColumns={3}
          renderItem={({ item }) => (
            <Card
              detail={item}
              onPress={(e) => {
                onPress(e);
              }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
}

const Card = ({ detail, onPress }) => {
  return (
    <TouchableOpacity
      key={detail.id}
      style={[styles.card, { backgroundColor: detail.backgroundColor }]}
      onPress={() => {
        onPress(detail);
      }}
    >
      <AppText
        style={{
          color: "#fff",
          fontSize: fontSize.regular,
        }}
      >
        {detail.title.toUpperCase()}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  description: {},
  card: {
    flex: 1,
    marginRight: 2,
    height: heightPercentageToDP("7%"),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
    borderRadius: 5,
  },
});

export default Cards;

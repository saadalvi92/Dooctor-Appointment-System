import React from "react";
import AppText from "./Text";
import colors from "../config/colors";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { baseUrl, imageUrl } from "../utils/baseUrl";
function AppointmentsCard(props) {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        borderRadius: 20,
        flex: 1,
        marginBottom: "5%",
        backgroundColor: props.color,
        justifyContent: "center",
      }}
      onPress={() => {
        props.goto();
      }}
    >
      <View style={styles.profileCard}>
        <View
          style={{
            flex: 1,
            marginRight: "3%",
          }}
        >
          {props.details.image == null ? (
            <Image
              source={require("../assets/images/User.png")}
              resizeMode="cover"
              style={{ height: hp("8%"), width: wp("14%"), borderRadius: 10 }}
            />
          ) : (
            <Image
              source={{
                uri: `${props.details.image}`,
              }}
              resizeMode="cover"
              style={{ height: hp("8%"), width: wp("14%"), borderRadius: 10 }}
            />
          )}
          <View style={{ position: "absolute", bottom: 22, right: 12 }}>
            {props.details.type == "clinic" ? (
              <Image
                source={require("../assets/images/LocationAppointment.png")}
              />
            ) : (
              <Image source={require("../assets/images/Video.png")} />
            )}
          </View>
        </View>
        <View
          style={{
            flex: 3,
            height: 110,
            // marginBottom: '2%',
          }}
        >
          <Text style={{ color: "#9393aa", fontSize: RFValue(13) }}>
            {props.details.type == "clinic" ? "Appointment" : "Video Call"}
          </Text>

          <Text
            style={{
              color: "#1e1f20",
              fontSize: RFValue(15),
              fontWeight: "bold",
            }}
          >
            {props.details.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <AppText style={{ color: "#1e1f20", fontSize: RFValue(13) }}>
              {moment(props.details.start_time).format("hh:mm A")} -
            </AppText>
            <AppText style={{ color: "#1e1f20", fontSize: RFValue(13) }}>
              {moment(props.details.end_time).format("hh:mm A")}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default AppointmentsCard;
const styles = StyleSheet.create({
  profileCard: {
    height: hp("12%"),
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

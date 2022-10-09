import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";
import SearchField from "../components/SearchField";
import HorizontalColorfulCardList from "../components/HorizontalColorfulCardList";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import moment from "moment";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import { RFValue as RF, RFValue } from "react-native-responsive-fontsize";
import { baseUrl } from "../utils/baseUrl";
import { app } from "../../Firebase";
function HomeScreen({ navigation, route }) {
  const [mood, setMood] = useState({});
  const [descriptionList, setDescriptionListList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [modal, setModal] = useState(false);
  const [subMood, setSubMood] = useState({});
  const [moodsList, setMoodsList] = useState([
    {
      id: "1",
      mood: "CALM",
      borderColor: colors.primary,
      backgroundcolor: "#fff",
      description: [
        { id: 1, title: "Content", backgroundColor: colors.primary },
        { id: 2, title: "Inspired", backgroundColor: colors.secondary },
        { id: 3, title: "Satisfied", backgroundColor: colors.primary },
        { id: 4, title: "Peaceful", backgroundColor: colors.primary },
        { id: 5, title: "Relieved", backgroundColor: colors.secondary },
        { id: 6, title: "Hopeful", backgroundColor: colors.primary },
        { id: 7, title: "Connected", backgroundColor: colors.secondary },
        { id: 8, title: "Balanced", backgroundColor: colors.primary },
        { id: 9, title: "Comfortable", backgroundColor: colors.secondary },
      ],
    },
    {
      id: "2",
      mood: "HAPPY",
      borderColor: "green",
      backgroundcolor: "#fff",
      description: [
        { id: 1, title: "Content", backgroundColor: colors.primary },
        { id: 2, title: "Inspired", backgroundColor: colors.secondary },
        { id: 3, title: "Satisfied", backgroundColor: colors.primary },
        { id: 4, title: "Peaceful", backgroundColor: colors.primary },
        { id: 5, title: "Relieved", backgroundColor: colors.secondary },
        { id: 6, title: "Hopeful", backgroundColor: colors.primary },
        { id: 7, title: "Connected", backgroundColor: colors.secondary },
        { id: 8, title: "Balanced", backgroundColor: colors.primary },
        { id: 9, title: "Comfortable", backgroundColor: colors.secondary },
      ],
    },
    {
      id: "3",
      mood: "SO_SO",
      borderColor: "lightpink",
      backgroundcolor: "#fff",
      description: [
        { id: 1, title: "Content", backgroundColor: colors.primary },
        { id: 2, title: "Inspired", backgroundColor: colors.secondary },
        { id: 3, title: "Satisfied", backgroundColor: colors.primary },
        { id: 4, title: "Peaceful", backgroundColor: colors.primary },
        { id: 5, title: "Relieved", backgroundColor: colors.secondary },
        { id: 6, title: "Hopeful", backgroundColor: colors.primary },
        { id: 7, title: "Connected", backgroundColor: colors.secondary },
        { id: 8, title: "Balanced", backgroundColor: colors.primary },
        { id: 9, title: "Comfortable", backgroundColor: colors.secondary },
      ],
    },
    {
      id: "4",
      mood: "SAD",
      borderColor: "orange",
      backgroundcolor: "#fff",
      description: [
        { id: 1, title: "Content", backgroundColor: colors.primary },
        { id: 2, title: "Inspired", backgroundColor: colors.secondary },
        { id: 3, title: "Satisfied", backgroundColor: colors.primary },
        { id: 4, title: "Peaceful", backgroundColor: colors.primary },
        { id: 5, title: "Relieved", backgroundColor: colors.secondary },
        { id: 6, title: "Hopeful", backgroundColor: colors.primary },
        { id: 7, title: "Connected", backgroundColor: colors.secondary },
        { id: 8, title: "Balanced", backgroundColor: colors.primary },
        { id: 9, title: "Comfortable", backgroundColor: colors.secondary },
      ],
    },
    {
      id: "5",
      mood: "Angry",
      borderColor: "red",
      backgroundcolor: "#fff",
      description: [
        { id: 1, title: "Content", backgroundColor: colors.primary },
        { id: 2, title: "Inspired", backgroundColor: colors.secondary },
        { id: 3, title: "Satisfied", backgroundColor: colors.primary },
        { id: 4, title: "Peaceful", backgroundColor: colors.primary },
        { id: 5, title: "Relieved", backgroundColor: colors.secondary },
        { id: 6, title: "Hopeful", backgroundColor: colors.primary },
        { id: 7, title: "Connected", backgroundColor: colors.secondary },
        { id: 8, title: "Balanced", backgroundColor: colors.primary },
        { id: 9, title: "Comfortable", backgroundColor: colors.secondary },
      ],
    },
  ]);
  const [userString, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userModes, setUserModes] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [showMoods, setShowMoods] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const dataString = await AsyncStorage.getItem("user");
    console.log("the data is here", JSON.parse(dataString));
    if (JSON.parse(dataString) != null) {
      setUser(JSON.parse(dataString));
    }
  };
  const setMoodClient = async () => {
    console.log("the user is as follows", userString);
    const db = await getFirestore(app);
    const washingtonRef = doc(db, "Users", userString.id);
    await updateDoc(washingtonRef, {
      Mood: { mood: mood, subMood: subMood },
    });
    setModal(true);
  };
  return (
    <Screen style={styles.container}>
      <View>
        {loading ? (
          <Spinner
            visible={true}
            textContent={""}
            textStyle={{
              color: "#FFF",
            }}
            color={colors.danger}
          />
        ) : null}
        <Modal
          isVisible={modal}
          onBackdropPress={() => {
            setMood({});
            setSubMood({});
            setModal(false);
          }}
        >
          <View
            style={{
              backgroundColor: "#DCEAF4",
              height: "40%",
              width: "95%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Image
              source={require("../assets/images/CheckMood.png")}
              style={{ marginBottom: "4%" }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: mood.borderColor,
                justifyContent: "center",
                alignItems: "center",
                height: "16%",
                marginHorizontal: "25%",
                borderRadius: 5,
                paddingHorizontal: "10%",
                marginBottom: "2%",
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ fontSize: RFValue(18), color: "#fff" }}>
                {mood.mood}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: subMood.backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                height: "16%",
                marginHorizontal: "25%",
                borderRadius: 5,
                paddingHorizontal: "10%",
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ fontSize: RFValue(18), color: "#fff" }}>
                {subMood.title}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#000",
                fontSize: RFValue(16),
                fontWeight: "400",
                marginTop: "4%",
              }}
            >
              Your mood is successfully set
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: RFValue(16),
                fontWeight: "400",
              }}
            >
              {moment(selectedDate).format("D-MMMM-YYYY")}
            </Text>
          </View>
        </Modal>
      </View>
      <ScrollView
        style={{ paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Header navigation={navigation} />

        <SearchField navigation={navigation} />

        <View>
          <AppText style={{ fontSize: RFValue(16) }}>
            Set your daily mood
          </AppText>
          {moodsList.length > 1 ? (
            <HorizontalColorfulCardList
              Data={moodsList}
              setState={(e) => {
                setMood(e);
                setSubMood(e.description[0]);
                setDescriptionListList(e.description);
              }}
            />
          ) : null}
        </View>

        {descriptionList.length != 0 && showMoods ? (
          <Cards
            Data={descriptionList}
            onPress={(e) => {
              setSubMood(e);
              var current = 0;
              userModes.map((item, index) => {
                if (item.date === selectedDate) {
                  current = 1;
                }
              });
              if (current == 0) {
                setMoodClient();
              }
            }}
          />
        ) : null}
        <Calendar
          goto={(date) => {
            if (new Date(date) <= new Date(Date.now())) {
              setShowMoods(true);
              setSelectedDate(date);
            }
          }}
          route={route}
          markedDates={markedDates}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    paddingBottom: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bell_icon: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;

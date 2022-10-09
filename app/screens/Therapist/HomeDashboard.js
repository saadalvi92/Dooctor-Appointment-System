import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import Screen from "../../components/Screen";
import Header from "../../components/Header";
import SearchField from "../../components/SearchField";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import colors from "../../config/colors";
import AppointmentsCard from "../../components/AppointmentsCard";
import AppButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { app } from "../../../Firebase";
function HomeDashboard({ navigation, route }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [bookings, setBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isFecthing,setIsFetching]=useState(fa)
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    const defaultuser = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(defaultuser);
    setUser(currentUser);

    const db = getFirestore(app);
    const col = collection(db, "Bookings");
    const col2 = collection(db, "Users");
    const snapShotUsers = await getDocs(col2);
    if (snapShotUsers.empty) {
      setLoading(false);
      return;
    }
    let DoctorsData = [];
    snapShotUsers.forEach((doc, index) => {
      if (doc.data().type != "Therapist") {
        DoctorsData.push({ ...doc.data(), id: doc.id });
      }
    });
    const snapShot = await getDocs(col);
    if (snapShot.empty) {
      setLoading(false);
      return;
    }
    let newData = [];
    await snapShot.forEach((doc, index) => {
      if (doc.data().doc_id == currentUser.id && doc.data().type == "online") {
        DoctorsData.map((doctor, doc_index) => {
          if (doctor.id == doc.data().client_id) {
            newData.push({
              ...doc.data(),
              id: doc.id,
              name: doctor.name,
              designation: "Therapist",
              doc_id: doctor.id,
              gender: doctor.gender,
              location: doctor.location,
              image: doctor.image,
            });
          }
        });
      }
    });
    const filteredNewData = newData.filter((item, index) => {
      const stringdata = item.start_time.slice(11, 16);
      if (stringdata >= moment(Date.now()).format("HH:mm")) {
        return item;
      }
    });
    setFilteredData(filteredNewData);
    setData(filteredNewData);
    setRefreshing(false);

    setLoading(false);
  };
  const SearchFilter = (txt) => {
    if (txt) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(txt);
    } else {
      setFilteredData(data);
      setSearch(txt);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setRefresh(!refresh);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={{ paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header navigation={navigation} />
        <SearchField
          navigation={navigation}
          TouchNavigate={false}
          showMap={false}
          search={(txt) => {
            SearchFilter(txt);
          }}
          Title="Search Appointments"
        />
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
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#ffffff",
            height: 120,
            width: "95%",
            alignSelf: "center",
            padding: "5%",
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(13),
              color: "#9393aa",
              fontWeight: "500",
            }}
          >
            View Client Appointment
          </Text>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Image
              source={require("../../assets/images/CalendarTherapist.png")}
              style={{ marginTop: "1%" }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 12,
                  fontSize: RFValue(16),
                  color: "#304659",
                  fontWeight: "500",
                }}
              >
                {moment(Date.now()).format("DD MMMM YYYY")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: "5%" }}>
          <Text
            style={{ marginBottom: "1%", color: "#9393aa", marginLeft: "2%" }}
          >
            ({data.length}) Today Consultation
          </Text>
          <FlatList
            style={styles.description}
            data={filteredData}
            key={(item) => {
              item.index;
            }}
            renderItem={({ item }) => (
              <AppointmentsCard
                goto={() => {
                  console.log("the data is here");
                }}
                details={item}
                color="#fff"
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default HomeDashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    paddingBottom: 3,
  },
});
